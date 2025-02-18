import {connect} from '@/dbConfig/dbConfig';
import {NextRequest, NextResponse} from 'next/server';
import User from '@/models/users/user.model';
import { decodeToken } from '@/helpers/decodeToken';


connect();


export async function POST(request: NextRequest){
    try {
        const userId = await decodeToken(request);
        console.log(userId);

        if (!userId || userId.length === 0) {
            console.error("UserId is not being fetched");
        }
        const user = await User.findOne({_id: userId}).select("-password");
        console.log('The user credentails are', user);
        

        if (!user) {
            return NextResponse.json(
                {message: "User is not registered", success: false},
                {status: 404}
            )
        }
        return NextResponse.json(
            {message: "User credentails fetched successfuly", success: true, data: user},
        )
    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}