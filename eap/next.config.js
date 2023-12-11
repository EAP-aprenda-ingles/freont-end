/** @type  {import('next').NextConfig} */

const  path  =  require('path')

const  nextConfig  = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: ['192.168.2.17', 'eap.krafti.com.br', 'eap-back.krtic.com.br'],
	},
	// distDir: 'build',
	
	// headers: () => [
	// 	{
	// 	  source: '/:path*',
	// 	  headers: [
	// 		{
	// 		  key: 'Cache-Control',
	// 		  value: 'no-store',
	// 		},
	// 	  ],
	// 	},
	//   ],
}

module.exports  =  nextConfig