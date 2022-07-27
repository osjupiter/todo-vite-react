import { useState } from 'react'
import { Box, Button, Card, CardActions, CardContent, colors, Container, Grid, TextField, Typography } from '@mui/material'
import styled from '@emotion/styled'

const Center = styled("div")({
  maxWidth: "1280px",
  margin: "0 auto",
  padding: "2rem",
  textAlign: "center",
  backgroundColor: "#FF00FF",
  minHeight:"70vh"
})

const Wrapper = styled("div")`
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}


`


function randomStr(){
  const data=[
    "寝る",
    "アイス食べる",
    "歯を磨く",
    "お茶をのむ",
    "パジャマを着替える",
    "朝ご飯食べる",
    "お風呂に入る",
    "こぼさずに食べる"
  ]
  const num = () => Math.floor(Math.random() * (data.length-1)) + 1
  return data[num()]
}

function BasicCard(p:{text:string,close?:boolean,callback?:(v:void)=>any}) {
  return (
    <Card sx={{ minWidth: 275,display:"flex",alignItems:"baseline",m:"3px",p:"8px" }}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {p.text}
        </Typography>
        {
          (<Button size="medium" sx={{mr:0,ml:"auto"}} disabled={!p.close} onClick={()=>p.callback?p.callback():""}>Done</Button>)
        }
    </Card>
  );
}

function App() {
  const [text, setText] = useState("")
  const [tasks, setTask] = useState<string[]>([])
  const [muda, setMuda] = useState<string[]>([])

  return (
    <div className="App">
      <Center>
        <Wrapper>
          <h1>Task vs Feelings</h1>
          <Container>
            <Grid container spacing={2}>
              <Grid item xs={6}>
                <h2>You</h2>
                <TextField value={text} onChange={n=>setText( n.target.value)} label="やること" fullWidth variant="outlined" onKeyDown={(e:any) => {
                  if (e.keyCode === 13) {
                    // エンターキー押下時の処理
                    const t:string=e.target.value
                    console.log(e.target.value);
                    setText("")
                    setTask([...tasks,t])
                    setMuda([...muda,randomStr()])
                  }
                }} />
                <Box>
                  {tasks.map((t,i)=><BasicCard key={`taks-${i}-${t}`} text={t} close callback={()=>{
                    console.log("delete",i)
                    setTask(tasks.filter((_,j)=>j!==i))
                    setMuda(muda.filter((_,j)=>j!==i))
                  }}/>)}
                </Box>

              </Grid>
              <Grid item xs={6}>
                <h2>5 years kid</h2>
                <TextField disabled label="入力中..." fullWidth variant="outlined" />
                <Box>
                  {muda.map((t,i)=><BasicCard key={`taks-${i}-${t}`} text={t}/>)}
                </Box>
              </Grid>
            </Grid>
          </Container>
          <div>
          </div>
        </Wrapper>
      </Center>
    </div>
  )
}

export default App
