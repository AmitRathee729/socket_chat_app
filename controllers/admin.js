const path = require('path');
const fs = require('fs');

module.exports = function(formidable) {
    return {
        SetRouting: function(router) {
            router.get('/dashboard', this.adminPage)

            router.post('/uploadFile', this.uploadFile);
        },

        adminPage: function(req, res) {
            res.render('admin/dashboard');
        },

        uploadFile: function(req, res){
            const form = new formidable.IncomingForm();
            // save uplaod image in uploads folder which is in public folder
            form.uploadDir = path.join(__dirname, '../public/uploads');

            form.on('file', (field, file) =>{
                // to save uploaded image with its original name
                fs.rename(file.path, path.join(form.uploadDir, file.name), (err)=> {
                    if(err) throw err;
                    console.log('File renamed successfully');
                })
            });

            form.on('error', (err) =>{
                console.log(err)
            });

            form.on('end', () => {
                console.log('File upload is successful')
            });

            form.parse(req);
        }
    }
}