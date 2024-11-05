import {defineMiddleware, sequence} from "astro:middleware";
import type {EndpointOutput, MiddlewareEndpointHandler} from "astro";


const securityHeaders: MiddlewareEndpointHandler = defineMiddleware(async (context, next) => {
    const response: Response | EndpointOutput = await next();
    response.headers.set(
        'Strict-Transport-Security',
        'max-age=31536000; includeSubDomains'
    );
    response.headers.set('X-Content-Type-Options', 'nosniff');
    response.headers.set('X-Frame-Options', 'SAMEORIGIN');
    response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    return response;
});

export const onRequest: MiddlewareEndpointHandler = sequence(
    securityHeaders,
)