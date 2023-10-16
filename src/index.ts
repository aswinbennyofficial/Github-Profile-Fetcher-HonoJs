import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()
app.get('/', (c) => c.text('Hello Hono!'))
// app.get('/github/:id', async (c) =>{
//     const id=c.req.param("id");
//     const ProfileUrl='https://api.github.com/users/'+id;
    

//     const Profilefetched = await fetch(Url);
//     const profileDetails = await Profilefetched.json();
//     console.log(profileDetails);

    
//    return c.json(profileDetails);
// } 
// );


// app.get('/repos/:id', async (c) =>{
//     const id=c.req.param("id");
//     const repoUrl='https://api.github.com/users/'+id+'/repos';
    

//     const repofetched = await fetch(repoUrl);
//     const repoJson = await repofetched.json();
//     console.log(repoJson);

//     const repoarray : string[]=[]; //explicitly type the array;

//     for( var i in repoJson){
//         repoarray.push(repoJson[i].name);
//     }
    
    
//    return c.text(repoarray[0]);
// } 
// );

app.get('/github/:id', async (c) =>{
    const id=c.req.param("id");
    const ProfileUrl='https://api.github.com/users/'+id;
    const repoUrl='https://api.github.com/users/'+id+'/repos';
    

    // for profile info
    const Profilefetched = await fetch(ProfileUrl);
    const profileJson = await Profilefetched.json();

    //for repo info
    const repofetched = await fetch(repoUrl);
    const repoJson = await repofetched.json();

    const repoarray : string[]=[]; //explicitly type the array;

    for( var i in repoJson){
        repoarray.push(repoJson[i].name);
    }

   
    const final = { ...profileJson, repo1: repoarray };

    return c.json(final);

    
} 
);

app.use('/static/*', serveStatic({ root: './' }))

serve(app);
