import {connect} from '@/dbConfig/dbConfig';
import {NextRequest, NextResponse} from 'next/server';
import User from '@/models/users/user.model';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

connect();

export async function POST(request: NextRequest) {
    try {
        const reqBody = await request.json();
        const {email, password} = reqBody;
        if (!password || !email) {
            return NextResponse.json(
                {error: "Provide both password and email to proceed to login"},
                {status: 401}
            )
        }
        console.log("The logging in user email is: ",email);

        const user = await User.findOne({email});
        if (!user) {
            return NextResponse.json(
                {error: "User not found please register first"},
                {status: 404}
            )
        }

        const isPasswordValid = await bcrypt.compare(password, user.password)
        if (!isPasswordValid) {
            return NextResponse.json(
                {error: "Invalid Password! Please check your credentials"},
                {status: 401}
            )
        }

        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }

        const token = jwt.sign(tokenData, process.env.SECRET_TOKEN!, {expiresIn: '1d'});
        const response = NextResponse.json(
            {message: "User logged in successfuly"},
            {status: 200}
        )

        response.cookies.set("token", token, {
            httpOnly: true
        })
        return response
    } catch (error: any) {
        return NextResponse.json(
            {error: error.message},
            {status: 500}
        )
    }
}