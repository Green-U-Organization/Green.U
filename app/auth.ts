import {betterAuth, BetterAuthOptions} from 'better-auth'
import {prismaAdapter} from 'better-auth'
import prisma from './prisma/prisma'

export const auth = betterAuth({
    database : prismaAdapter(prisma, {
        provider: "mysql"

    }),
    emailAndPassword: {
        enabled: true,
        requireEmailVerification: true
    },
    emailVerification: {
        sendOnSignUp: true,
        autoSignInAfterVerification: true,
        sendVerificationEmail: async({user, token}) => {
            const verificationUrl = `${process.env.BETTER_AUTH_URL}/api/auth/verify-email?token=${token}&callbackURL=${process.env.EMAIL_VERIFICATION_CALLBACK_URL}`
            await sendEmail({
                to: user.email,
                subject: "Verify your Green.U account",
                text: `Click the link to verify your email: ${verificationUrl} `
            })
        }
    }
} satisfies BetterAuthOptions)