module.exports = {
	"dev": {
		"options": {
			"sourcemap": "none",
			"style": "compressed",            
			"require": [
				"sass-globbing"
			]
		},
		"files":  [
			{
				expand: true,
				cwd: "<%= paths.source.css %>",
				src: ['*.scss'],
				dest: "<%= paths.dest.css %>",
				ext: ".css"
			}
		]
	}
};