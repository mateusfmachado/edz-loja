import React from 'react';
import NextHead from 'next/head';
import { string } from 'prop-types';

const defaultDescricao = '';
const defaultOGURL = '';
const defaultOGImage = "/static/logo.png";

const Head = props => (
    <NextHead>
        <meta charSet="UTF-8" />
        <title>{ props.title || "" }</title>
        <meta 
            name="description"
            content={props.description || defaultDescricao} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/static/favicon.ico" />
        <meta property="og:url" content={props.url || defaultOGURL} />
        <meta property="og:title" content={props.title || ""} />
        <meta 
            property="og:description"
            content={props.description || defaultDescricao} />
        <meta property="twitter:site" content={props.url || defaultOGURL} />
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:image" content={props.ogImage || defaultOGImage} />
        <meta property="og:image" content={props.ogImage || defaultOGImage} />
        <meta property="og:image:width" content="600" />
        <meta property="og:image:height" content="600" />
        <link 
            rel="stylesheet" 
            href="https://stackpath.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css" 
            integrity="sha384-wvfXpqpZZVQGK6TAh5PVlGOfQNHSoD2xbE+QkPxCAFlNEevoEH3Sl0sibVcOQVnN" 
            crossOrigin="anonymous" />
        <link rel="stylesheet" href="/static/style.css" />
        {
            props.pagSeguro ? (
                <script
                    type="text/javascript"
                    src="https://stc.sandbox.pagseguro.uol.com.br/pagseguro/api/v2/checkout/pagseguro.directpayment.js" >
                </script>
            ) : null
        }
        { props.children }
    </NextHead>
);

Head.propTypes = {
    title: string,
    description: string,
    url: string,
    ogImage: string
};

export default Head;