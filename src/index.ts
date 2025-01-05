import  express  from "express";
import  morgan from "morgan";
import cors from 'cors';
import estudiantesRoutes from "./routes/estudiantesRoutes";
import profesosresRoutes from "./routes/profesoresRoutes";
import cursosRoutes from "./routes/cursosRoutes";


const app = express();

app.use(morgan('dev'));
app.use(cors());
app.get('/ping',(req,res)=>{
    res.send('pong');
});

app.use("/estudiantes", estudiantesRoutes);
app.use("/profesores",profesosresRoutes);
app.use("/cursos", cursosRoutes)

app.listen(6505, ()=>{
    console.log('Server activo!!');
});