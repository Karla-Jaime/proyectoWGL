const canvas = document.getElementById('glcanvas');
const gl = canvas.getContext('webgl2');

// CLEAR SCREAN

gl.clearColor(0, 0, 0, 1);
gl.clear(gl.COLOR_BUFFER_BIT);


//DECLARE SHADER

const vertexShader = `#version 300 es 
    precision mediump float;
    
    in vec2 position;    
    in vec3 color;
    out vec3 vColor;
    
    void main()
    {
        gl_Position = vec4(position, 0, 1);
        vColor = color;
    }
    `;

const fragmentShader = `#version 300 es
    precision mediump float;

    out vec4 fragColor;
    in vec3 vColor;

    void main()
    {
        fragColor = vec4(vColor, 1);
    }

`;

//COMPILE SHADER

const vs = gl.createShader(gl.VERTEX_SHADER);
const fs = gl.createShader(gl.FRAGMENT_SHADER);

gl.shaderSource(vs, vertexShader);
gl.shaderSource(fs, fragmentShader);
gl.compileShader(vs);
gl.compileShader(fs);

if(!gl.getShaderParameter(vs, gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(vs));
}

if(!gl.getShaderParameter(fs, gl.COMPILE_STATUS)){
    console.error(gl.getShaderInfoLog(fs));
}

const program = gl.createProgram();
gl.attachShader(program, vs);
gl.attachShader(program, fs);
gl.linkProgram(program);

if(!gl.getProgramParameter(program, gl.LINK_STATUS)){
    console.error(gl.getProgramInfoLog(program));
}

gl.useProgram(program);

const triangleCoords = [
    //FONDO
    -1, -1, 
    1, 1,
    -1, 1,

    1,1,
    -1,-1,
    1,-1,
    
    //CONTORNO mitad1

    0.2,0.5,
    -0.2,0.4,
    0.2,0.4,
    
    0.2,0.5,
   -0.2,0.5,
   -0.2,0.4,

   -0.2,0.5,
   -0.2,0.6,
   -0.3,0.6,

   -0.3,0.6,
   -0.3,0.5,
   -0.2,0.5,

   -0.3,0.6,
   -0.4,0.6,
   -0.4,0.7,

   -0.4,0.7,
   -0.3,0.6,
   -0.3,0.7,

   -0.4,0.6,
   -0.4,0.5,
   -0.5,0.5,

   -0.5,0.6,
   -0.5,0.5,
   -0.4,0.6,

   -0.5,0.4,
   -0.5,0.5,
   -0.6,0.4,

   -0.6,0.5,
   -0.6,0.4,
   -0.5,0.5,

   -0.6,0.4,
   -0.5,0.4,
   -0.6,0.3,

   -0.5,0.4,
   -0.6,0.3,
   -0.5,0.3,

   -0.5,0.3,
   -0.4,0.3,
   -0.4,0.2,

   -0.4,0.2,
   -0.5,0.3,
   -0.5,0.2,

   -0.5,0.2,
   -0.5,0.1,
   -0.6,0.2,

   -0.6,0.2,
   -0.6,0.1,
   -0.5,0.1,

   
   -0.6,0.1,
   -0.5,0.1,
   -0.5,0.0,
   
   -0.6,0.1,
   -0.6,0.0,
   -0.5,0.0,

   -0.7,0.0,
   -0.6,0.0,
   -0.6,-0.1,
   
   -0.7,0.0,
   -0.7,-0.1,
   -0.6,-0.1,
   
   -0.7,-0.2,
   -0.6,-0.2,
   -0.6,-0.3,
   
   -0.7,-0.2,
   -0.7,-0.3,
   -0.6,-0.3,
    
   -0.6,-0.3,
   -0.5,-0.3,
   -0.5,-0.4,
   
   -0.6,-0.3,
   -0.6,-0.4,
   -0.5,-0.4,
   
   -0.6,-0.4,
   -0.5,-0.4,
   -0.5,-0.5,
   
   -0.6,-0.4,
   -0.6,-0.5,
   -0.5,-0.5,
   
   -0.5,-0.5,
   -0.4,-0.5,
   -0.4,-0.6,

   -0.4,-0.6,
   -0.5,-0.5,
   -0.5,-0.6,

   -0.3,-0.7,
   -0.4,-0.7,
   -0.4,-0.6,

   -0.4,-0.6,
   -0.3,-0.7,
   -0.3,-0.6,

   -0.2,-0.7,
   -0.3,-0.7,
   -0.3,-0.6,

   -0.3,-0.6,
   -0.2,-0.6,
   -0.2,-0.7,

  //MITAD
  0.2,-0.6,
  -0.2,-0.7,
  0.2,-0.7,
  
  0.2,-0.6,
 -0.2,-0.6,
 -0.2,-0.7,

 // Contorno mitad parte 2

 0.2,0.5,
 0.2,0.6,
 0.3,0.6,

 0.3,0.6,
 0.3,0.5,
 0.2,0.5,

 0.3,0.6,
 0.4,0.6,
 0.4,0.7,

 0.4,0.7,
 0.3,0.6,
 0.3,0.7,

 0.4,0.6,
 0.4,0.5,
 0.5,0.5,

 0.5,0.6,
 0.5,0.5,
 0.4,0.6,

 0.5,0.4,
 0.5,0.5,
 0.6,0.4,

 0.6,0.5,
 0.6,0.4,
 0.5,0.5,

 0.6,0.4,
 0.5,0.4,
 0.6,0.3,

 0.5,0.4,
 0.6,0.3,
 0.5,0.3,

 0.5,0.3,
 0.4,0.3,
 0.4,0.2,

 0.4,0.2,
 0.5,0.3,
 0.5,0.2,

 0.5,0.2,
 0.5,0.1,
 0.6,0.2,

 0.6,0.2,
 0.6,0.1,
 0.5,0.1,

 
 0.6,0.1,
 0.5,0.1,
 0.5,0.0,
 
 0.6,0.1,
 0.6,0.0,
 0.5,0.0,

 0.7,0.0,
 0.6,0.0,
 0.6,-0.1,
 
 0.7,0.0,
 0.7,-0.1,
 0.6,-0.1,
 
 0.7,-0.2,
 0.6,-0.2,
 0.6,-0.3,
 
 0.7,-0.2,
 0.7,-0.3,
 0.6,-0.3,
  
 0.6,-0.3,
 0.5,-0.3,
 0.5,-0.4,
 
 0.6,-0.3,
 0.6,-0.4,
 0.5,-0.4,
 
 0.6,-0.4,
 0.5,-0.4,
 0.5,-0.5,
 
 0.6,-0.4,
 0.6,-0.5,
 0.5,-0.5,
 
 0.5,-0.5,
 0.4,-0.5,
 0.4,-0.6,

 0.4,-0.6,
 0.5,-0.5,
 0.5,-0.6,

 0.3,-0.7,
 0.4,-0.7,
 0.4,-0.6,

 0.4,-0.6,
 0.3,-0.7,
 0.3,-0.6,

 0.2,-0.7,
 0.3,-0.7,
 0.3,-0.6,

 0.3,-0.6,
 0.2,-0.6,
 0.2,-0.7,

 //OREJAS IZQ

 -0.4,0.4,
 -0.3,0.4,
 -0.4,0.3,

 -0.3,0.4,
 -0.4,0.3,
 -0.3,0.3,

 -0.5,0.4,
 -0.4,0.4,
 -0.5,0.3,

 -0.4,0.4,
 -0.5,0.3,
 -0.4,0.3,

 -0.5,0.5,
 -0.4,0.5,
 -0.5,0.4,

 -0.4,0.5,
 -0.5,0.4,
 -0.4,0.4,
 // OREJA DER

 0.4,0.4,
 0.3,0.4,
 0.4,0.3,

 0.3,0.4,
 0.4,0.3,
 0.3,0.3,

 0.5,0.4,
 0.4,0.4,
 0.5,0.3,

 0.4,0.4,
 0.5,0.3,
 0.4,0.3,

 0.5,0.5,
 0.4,0.5,
 0.5,0.4,

 0.4,0.5,
 0.5,0.4,
 0.4,0.4,

 //NARIZ
 -0.05,-0.2,
 -0.05,-0.3,
  0.05,-0.2,

  0.05,-0.2,
  0.05,-0.3,
  -0.05,-0.3,

  -0.05,-0.3,
  -0.05,-0.4,
   0.05,-0.3,
 
   0.05,-0.3,
   0.05,-0.4,
   -0.05,-0.4,
 //OJO
//Parte izq
    -0.3,-0.1,
    -0.2,-0.1,
    -0.3,0.0,

    -0.3,0.0,
    -0.2,0.0,
    -0.2,-0.1,

    
    -0.2,0.0,
    -0.1,0.0,
    -0.2,0.1,

    -0.2,0.1,
    -0.1,0.1,
    -0.1,0.0,
    
    -0.2,-0.1,
    -0.1,-0.1,
    -0.2,0.0,

    -0.2,0.0,
    -0.1,0.0,
    -0.1,-0.1,

    //Parte der
    0.3,-0.1,
    0.2,-0.1,
    0.3,0.0,

    0.3,0.0,
    0.2,0.0,
    0.2,-0.1,

    
    0.2,0.0,
    0.1,0.0,
    0.2,0.1,

    0.2,0.1,
    0.1,0.1,
    0.1,0.0,
    
    0.2,-0.1,
    0.1,-0.1,
    0.2,0.0,

    0.2,0.0,
    0.1,0.0,
    0.1,-0.1,
    

    //BOCA
   
    -0.15,-0.3,
    -0.15,-0.4,
    -0.05,-0.3,

    -0.05,-0.3,
    -0.05,-0.4,
    -0.15,-0.4,

    0.15,-0.3,
    0.15,-0.4,
    0.05,-0.3,

    0.05,-0.3,
    0.05,-0.4,
    0.15,-0.4,
    

    //CABEZA
    0.1,0.4,
    -0.1,0.3,
    0.1,0.3,
    
    0.1,0.4,
   -0.1,0.4,
   -0.1,0.3,
   
   //LUNA izq
   -0.1,0.15,
   -0.1,0.2,
   -0.0,0.15,

   -0.0,0.15,
   -0.0,0.2,
   -0.1,0.2,

   -0.15,0.2,
   -0.15,0.25,
   -0.10,0.2,

   -0.10,0.2,
   -0.10,0.25,
   -0.15,0.25,

   //LUNA der
   0.1,0.15,
   0.1,0.2,
   0.0,0.15,

   0.0,0.15,
   0.0,0.2,
   0.1,0.2,

   0.15,0.2,
   0.15,0.25,
   0.10,0.2,

   0.10,0.2,
   0.10,0.25,
   0.15,0.25,

   //brillo ojos
   -0.3,0.0,
    -0.2,0.0,
    -0.3,0.1,

    -0.3,0.1,
    -0.2,0.1,
    -0.2,0.0,

    0.3,0.0,
    0.2,0.0,
    0.3,0.1,

    0.3,0.1,
    0.2,0.1,
    0.2,0.0,
   
    //lengua
     -0.05,-0.4,
     -0.05,-0.5,
     0.05,-0.4,
 
     0.05,-0.4,
     0.05,-0.5,
     -0.05,-0.5,

     -0.4,-0.5,
     -0.3,-0.5,
     -0.3,-0.6,
  
     -0.3,-0.6,
     -0.4,-0.5,
     -0.4,-0.6,

     0.4,-0.5,
     0.3,-0.5,
     0.3,-0.6,
  
     0.3,-0.6,
     0.4,-0.5,
     0.4,-0.6,

];



const vertexColor = [
  //FONDO
  0.385, 0.209, 0.870,
  0.385, 0.209, 0.870,
  0.385, 0.209, 0.870,
   
   
  0.385, 0.209, 0.870,
  0.385, 0.209, 0.870,
  0.385, 0.209, 0.870,

   //contorno
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,

   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,
   0.0, 0.0, 0.0,


   ////colores oreja

   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,

   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,

   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,

   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,

   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,

   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,

   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,

   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,

   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,

   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,

   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,

   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,
   1.0, 0.670, 0.846,

    ////colores BOCA

    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
 
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
 
    1.0, 0.670, 0.846,
    1.0, 0.670, 0.846,
    1.0, 0.670, 0.846,
 
    1.0, 0.670, 0.846,
    1.0, 0.670, 0.846,
    1.0, 0.670, 0.846,
 
    //OJO izq

   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,
 
   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,

   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,
 
   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,

   0.206, 0.0464, 0.580,
   0.206, 0.0464, 0.580,
   0.206, 0.0464, 0.580,
 
   0.206, 0.0464, 0.580,
   0.206, 0.0464, 0.580,
   0.206, 0.0464, 0.580,

    //OJO der

   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,
 
   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,

   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,
 
   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,
   0.670, 0.923, 1.00,

   0.206, 0.0464, 0.580,
   0.206, 0.0464, 0.580,
   0.206, 0.0464, 0.580,
 
   0.206, 0.0464, 0.580,
   0.206, 0.0464, 0.580,
   0.206, 0.0464, 0.580,

    //BOCA

    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
 
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
 
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
 

    //CABEZA
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
 
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    0.0, 0.0, 0.0,
    
    
    
    //luna
    0.980, 0.874, 0.0686,
    0.980, 0.874, 0.0686,
    0.980, 0.874, 0.0686,

    0.980, 0.874, 0.0686,
    0.980, 0.874, 0.0686,
    0.980, 0.874, 0.0686,
 
    0.830, 0.734, 0.00830,
    0.830, 0.734, 0.00830,
    0.830, 0.734, 0.00830,

    0.830, 0.734, 0.00830,
    0.830, 0.734, 0.00830,
    0.830, 0.734, 0.00830,

    0.980, 0.874, 0.0686,
    0.980, 0.874, 0.0686,
    0.980, 0.874, 0.0686,

    0.980, 0.874, 0.0686,
    0.980, 0.874, 0.0686,
    0.980, 0.874, 0.0686,
 
    0.830, 0.734, 0.00830,
    0.830, 0.734, 0.00830,
    0.830, 0.734, 0.00830,

    0.830, 0.734, 0.00830,
    0.830, 0.734, 0.00830,
    0.830, 0.734, 0.00830,
 
    //DETALLES OJOS
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,

    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
    1.0, 1.0, 1.0,
 
    ////lengua
    1.0, 0.670, 0.846,
    1.0, 0.670, 0.846,
    1.0, 0.670, 0.846,
 
    1.0, 0.670, 0.846,
    1.0, 0.670, 0.846,
    1.0, 0.670, 0.846,
    
   
 
];



const positionBuffer = gl.createBuffer();
const colorBuffer = gl.createBuffer();



gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleCoords), gl.STATIC_DRAW);
const position = gl.getAttribLocation(program, 'position');
gl.enableVertexAttribArray(position);
gl.vertexAttribPointer(position, 2, gl.FLOAT, gl.FALSE, 0, 0);

gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexColor), gl.STATIC_DRAW);
const color = gl.getAttribLocation(program, 'color');
gl.enableVertexAttribArray(color);
gl.vertexAttribPointer(color, 3, gl.FLOAT, gl.FALSE, 0, 0);




gl.drawArrays(gl.TRIANGLES, 0, 363);
