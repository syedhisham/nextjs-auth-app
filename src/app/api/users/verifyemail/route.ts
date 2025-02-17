import {connect} from '@/dbConfig/dbConfig';
import {NextRequest, NextResponse} from 'next/server';
import User from '@/models/users/user.model';


connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {token} = reqBody;
        console.log("The token is: ",token);

        console.log("Before user finding");
        const user = await User.findOne({
            verifyToken: token,
            verifyTokenExpiry: { $gt: Date.now() }
        });
        console.log("After user finding");
        
        if (!user) {
        return NextResponse.json({error: "Invalid Token"}, {status: 400})
        }
        console.log(user);

        user.isVerified = true;
        user.verifyToken = undefined;
        user.verifyTokenExpiry = undefined;

        await user.save();

        return NextResponse.json(
            {message: "User verified successfuly", success: true},
            {status: 200},
            
        )
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}