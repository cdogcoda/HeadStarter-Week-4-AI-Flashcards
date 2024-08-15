import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {apiVersion: '2022-11-15'})

const formatAmountForStripe = (amount) => {
    return Math.round(amount*100)
}

export async function POST(req) {
    const params = {
        mode: 'subscription',
        payment_method_types: ['card'],
        line_items: [
            {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: 'Pro subscription'
                    }, 
                    unit_amount: formatAmountForStripe(10),
                    recurring: {
                        interval: 'month',
                        interval_count: 1,
                    } 
                },
                quantity: 1,
            }
        ],
        success_url: `${req.headers.get('Referer')}result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.get('Referer')}result?session_id={CHECKOUT_SESSION_ID}`
    }
    try {
        const checkoutSession = await stripe.checkout.sessions.create(params)
        return new NextResponse.json(checkoutSession, {
            status: 200,
        })

    } catch (error) {
        console.error('Error creating session:', error)
        return new NextResponse(JSON.stringify({error: {message: error.message}}), {status: 500})
    }
}

export async function GET(req) {
    const searchParams = req.nextUrl.searchParams
    const session_id = searchParams.get('session_id')
    try {
        if (!session_id) {
            throw new Error('Session ID is required')
        }
        const checkoutSession = await stripoe.checkout.sessions.retrive(session_id)
        return new NextResponse.json(checkoutSession, {
            status: 200,
        })
    } catch (error) {
        console.error('Error retrieving checkout session:', error)
        return new NextResponse.json({error: {message: error.message}}, {status: 500})
    }
}