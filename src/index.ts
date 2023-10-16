import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { serveStatic } from '@hono/node-server/serve-static'

const app = new Hono()
app.get('/', (c) => c.text('Hello Hono!'))
app.get('/github/:id', async (c) =>{
    const id=c.req.param("id");
    const Url='https://api.github.com/users/'+id;
    

    const fetched = await fetch(Url);
    const profileDetails = await fetched.json();
    console.log(profileDetails);

    
   return c.html(`<h1>${profileDetails.name}<h1>`);
} 
);


app.get('/repos/:id', async (c) =>{
    const id=c.req.param("id");
    const Url='https://api.github.com/users/'+id+'/repos';
    

    const fetched = await fetch(Url);
    const repoJson = await fetched.json();
    console.log(repoJson);

    const repoarray : string[]=[]; //explicitly type the array;

    for( var i in repoJson){
        repoarray.push(repoJson[i].name);
    }
    
    
   return c.text(repoarray[0]);
} 
);

app.use('/static/*', serveStatic({ root: './' }))

serve(app);
