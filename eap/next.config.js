/** @type  {import('next').NextConfig} */

const  path  =  require('path')

const  nextConfig  = {
	sassOptions: {
		includePaths: [path.join(__dirname, 'styles')],
	},
	images: {
		domains: ['192.168.2.17'],
	},
	distDir: 'build',
	
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