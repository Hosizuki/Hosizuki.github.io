<link rel="stylesheet" class="aplayer-secondary-style-marker" href="/assets/css/APlayer.min.css"><script src="/assets/js/APlayer.min.js" class="aplayer-secondary-script-marker"></script><script class="meting-secondary-script-marker" src="/assets/js/Meting.min.js"></script>
    // Get a file as a string using  AJAX
    function loadFileAJAX(name) {
        var xhr = new XMLHttpRequest(),
            okStatus = document.location.protocol == "file:" ? 200 : 0;
        xhr.open('GET', name, false);
        xhr.send(null);
        return xhr.status == okStatus ? xhr.responseText : null;
    };

    function getShader(gl, shaderName, type) {
        var shader = gl.createShader(type),
                shaderScript = loadFileAJAX(shaderName);
        if (!shaderScript) {
            alert("Could not find shader source: " + shaderName);
        }
        gl.shaderSource(shader, shaderScript);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }
        return shader;
    };   
    
    function initShaders(gl, vShaderName, fShaderName) {

        var vertexShader = getShader(gl, vShaderName, gl.VERTEX_SHADER),
            fragmentShader = getShader(gl, fShaderName, gl.FRAGMENT_SHADER),
            program = gl.createProgram();

        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);

        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
            return null;
        }

        
        return program;
    };

