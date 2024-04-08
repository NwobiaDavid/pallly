import connectToDB from '@/utlis/connectMongo';
import { NextResponse } from 'next/server';
import { MongoClient } from 'mongodb';
import userModal from '@/utlis/model/user';

export async function POST(req: { method: string; json: () => PromiseLike<{ email: any; }> | { email: any; }; }) {
  if (req.method === 'POST') {

    const { email } = await req.json();
    // console.log('email=> ', email);
    await connectToDB();

    try {
      const newUser = new userModal({
        email: email,
      });

      await newUser.save();

      return NextResponse.json(
        {
          message: 'SUCCESSFUL',
        },
        { status: 201 }
      );
    } catch (error) {
      console.error('Error subscribing email:', error);
      return NextResponse.json(
        { message: 'Something went wrong' },
        { status: 500 }
      );
    }
  } else {
    return NextResponse.json({ message: 'invalid request' }, { status: 409 });
  }
}
