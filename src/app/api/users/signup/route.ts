import {connect} from '@/dbConfig/dbConfig';
import {NextRequest, NextResponse} from 'next/server';
import User from '@/models/users/user.model';
import bcrypt from 'bcryptjs';
import { sendEmail } from '@/helpers/mailer';


connect();


export async function POST(request: NextRequest){
    try {
        const reqBody = await request.json();
        console.log(reqBody);
        const {username, email, password} = reqBody;

        const user = await User.findOne({email});
        if (user) {
            return NextResponse.json( {error: "User is already registered"}, {status: 400})
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword
        })
        const savedUser = await newUser.save();
        console.log("User is successfuly saved", savedUser);

        //Send Verification email
        await sendEmail({email, emailType: "VERIFY", userId: savedUser._id} );

        const userResponse = {
            _id: savedUser._id,
            username: savedUser.username,
            email: savedUser.email,
            isVerified: savedUser.isVerified,
            isAdmin: savedUser.isAdmin,
        };
        return NextResponse.json({
            message: "User registered successfuly",
            success: true,
            userResponse,
        })
        
    } catch (error: any) {
        return NextResponse.json({error: error.message}, {status: 500})
    }
}