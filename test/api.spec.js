const server = require('../server.js');
const request = require('supertest');
const test = require('tape');

var token = null;
var newPost = null;
var newUser = null;
var newComment = null;
var newPostCategory = null;

it('AUTH TEST', (done) => {

    const params = {
        email:"teste@teste.com",
        password:"teste.com"
    }

    request(server)
        .post('/api/auth')
        .send(params)
        .expect(200)
        .end((err, res) => {
            if(err) throw {error:err,response:res.text};
            console.log(res.text);
            const resJson = JSON.parse(res.text);
            token = resJson.body.token;
            done();
        })
});

it('CREATE USER TEST', (done) => {

    const params = {
        email:"teste@teste.com",
        password:"teste.com",
        name:"Marco@Garuthi"
    }

    request(server)
        .post('/api/register')
        .send(params)
        .expect(200)
        .end((err, res) => {
            if(err) throw {error:err,response:res.text};
            console.log(res.text);
            newUser = JSON.parse(res.text).body;
            done();
        })
});






it('LIST POST-CATEGORIES TEST', (done) => {

    const headers = {
        Authorization: "Bearer " + token
    }

    request(server)
        .get('/api/post-category/list')
        .set(headers)
        .expect(200)
        .end((err, res) => {
            if(err) throw {error:err,response:res.text};
            console.log(res.text);
            
            done();
        });

});

it('CREATE POST-CATEGORY TEST', (done) => {

    const headers = {
        Authorization: "Bearer " + token
    }

    const params = {
        name:"Minha categoria de posts"
    }

    request(server)
        .post('/api/post-category')
        .set(headers)
        .send(params)
        .expect(200)
        .end((err, res) => {
            if(err) throw {error:err,response:res.text};
            console.log(res.text);
            newPostCategory = JSON.parse(res.text).body;
            done();
        });

});

it('UPDATE POST-CATEGORY TEST', (done) => {

    const headers = {
        Authorization: "Bearer " + token
    }

    const params = {
        post_category_id:newPostCategory.id,
        name:"Minha categoria de posts alterada"
    }

    request(server)
        .put('/api/post-category')
        .set(headers)
        .send(params)
        .expect(200)
        .end((err, res) => {
            if(err) throw {error:err,response:res.text};
            console.log(res.text);
            done();
        })

});





it('LIST POST TEST', (done) => {

    const headers = {
        Authorization: "Bearer " + token
    }

    request(server)
        .get('/api/post/list')
        .set(headers)
        .expect(200)
        .end((err, res) => {
            if(err) throw {error:err,response:res.text};
            console.log(res.text);
            
            done();
        });

});

it('LIST POST BY CATEGORY TEST', (done) => {

    const headers = {
        Authorization: "Bearer " + token
    }

    request(server)
        .get(`/api/post/category/${newPostCategory.id}`)
        .set(headers)
        .expect(200)
        .end((err, res) => {
            if(err) throw {error:err,response:res.text};
            console.log(res.text);
            
            done();
        });

});


it('CREATE POST TEST', (done) => {

    const headers = {
        Authorization: "Bearer " + token
    }

    const params = {
        category_id:newPostCategory.id,
        title:"Resumo sobre o Brasil",
        html_content:"<p>Eu acho isso e isso</p>"
    }

    request(server)
        .post('/api/post')
        .set(headers)
        .send(params)
        .expect(200)
        .end((err, res) => {
            if(err) throw {error:err,response:res.text};
            console.log(res.text);
            newPost = JSON.parse(res.text).body;
            done();
        });

});

it('UPDATE POST TEST', (done) => {

    const headers = {
        Authorization: "Bearer " + token
    }

    const params = {
        post_id:newPost.id,
        category_id:newPostCategory.id,
        title:"Tudo sobre bem estar",
        html_content:"<p>bla bla bla!!!!</p>"
    }

    request(server)
        .put('/api/post')
        .set(headers)
        .send(params)
        .expect(200)
        .end((err, res) => {
            if(err) throw {error:err,response:res.text};
            console.log(res.text);
            done();
        })

});



it('LIST COMMENTS TEST', (done) => {

    const headers = {
        Authorization: "Bearer " + token
    }

    request(server)
        .get('/api/comment/list')
        .set(headers)
        .expect(200)
        .end((err, res) => {
            if(err) throw {error:err,response:res.text};
            console.log(res.text);
            
            done();
        });

});

it('CREATE COMMENT TEST', (done) => {

    const headers = {
        Authorization: "Bearer " + token
    }

    const params = {
        post_id:newPost.id,
        user_id:newUser.id,
        text:"XPTO"
    }

    request(server)
        .post('/api/comment')
        .set(headers)
        .send(params)
        .expect(200)
        .end((err, res) => {
            if(err) throw {error:err,response:res.text};
            console.log(res.text);
            newComment = JSON.parse(res.text).body;
            done();
        });

});

it('UPDATE COMMENT TEST', (done) => {

    const headers = {
        Authorization: "Bearer " + token
    }

    const params = {
        comment_id:newComment.id,
        user_id:newUser.id,
        text:"XPTO alterado!"
    }

    request(server)
        .put('/api/comment')
        .set(headers)
        .send(params)
        .expect(200)
        .end((err, res) => {
            if(err) throw {error:err,response:res.text};
            console.log(res.text);
            done();
        })

});

it('LIST COMMENTS BY POST TEST', (done) => {

    const headers = {
        Authorization: "Bearer " + token
    }

    request(server)
        .get(`/api/post/${newPost.id}/comment/list`)
        .set(headers)
        .expect(200)
        .end((err, res) => {
            if(err) throw {error:err,response:res.text};
            console.log(res.text);
            
            done();
        });

});



// it('DELETE POST-CATEGORY TEST', (done) => {

//     const headers = {
//         Authorization: "Bearer " + token
//     };

//     const params = {
//         post_category_id:newPostCategory.id
//     }

//     request(server)
//         .delete('/api/post-category')
//         .set(headers)
//         .send(params)
//         .expect(200)
//         .end((err, res) => {
//             if(err) throw {error:err,response:res.text};
//             console.log(res.text);
//             done();
//         })

// });






// it('DELETE COMMENT TEST', (done) => {

//     const headers = {
//         Authorization: "Bearer " + token
//     }

//     const params = {
//         comment_id:newComment.id
//     }

//     request(server)
//         .delete('/api/comment')
//         .set(headers)
//         .send(params)
//         .expect(200)
//         .end((err, res) => {
//             if(err) throw {error:err,response:res.text};
//             console.log(res.text);
//             done();
//         })

// });


// it('DELETE POST TEST', (done) => {

//     const headers = {
//         Authorization: "Bearer " + token
//     }

//     const params = {
//         post_id:newPost.id
//     }

//     request(server)
//         .delete('/api/post')
//         .set(headers)
//         .send(params)
//         .expect(200)
//         .end((err, res) => {
//             if(err) throw {error:err,response:res.text};
//             console.log(res.text);
//             done();
//         })

// });