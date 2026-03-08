import axios from 'axios';

async function test() {
  try {
    const authRes = await axios.post('https://ai-integrated-mern-project.onrender.com/api/auth/google', {
      email: 'test' + Date.now() + '@test.com',
      name: 'Tester'
    });
    
    // Cookie is an array or string
    let cookieStr = "";
    if (authRes.headers['set-cookie']) {
       cookieStr = authRes.headers['set-cookie'][0];
    }
    
    console.log("Cookie:", cookieStr);

    const notesRes = await axios.post('https://ai-integrated-mern-project.onrender.com/api/notes/generate-notes', {
      topic: 'test',
      classLevel: '10',
      examType: 'CBSE'
    }, {
      headers: {
        Cookie: cookieStr
      }
    });

    console.log("Notes Response SUCCESS! Data Length:", JSON.stringify(notesRes.data).length);
  } catch (error) {
    if (error.response) {
      console.log("Notes Response ERROR:", error.response.status, error.response.data);
    } else {
      console.log("Network ERROR:", error.message);
    }
  }
}

test();
