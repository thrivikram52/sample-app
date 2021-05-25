require("babel-core/register");
require("babel-polyfill");
var DeleteData = require('./DeleteData')

module.export = {
	"delete_posts":DeleteData.posts
}

return DeleteData.delete_posts();
