class sliderTextInput extends HTMLElement {
    connectedCallback() {
        this.innerHTML = `<label for="slider">Slider</label>
                          <input type="range" id="slider" name="slider" min="1" max="10" value="1">
                          <label for="text">Text</label>
                          <input type="number" id="text" name="text" min="1" max="10" value="1">`;
        
        let slider = document.getElementById('slider');
        let text = document.getElementById('text');
        
        slider.addEventListener('input', function() {
            text.value = slider.value;
        });
        text.addEventListener('input', function() {
            if(text.value > 10) { text.value = 10;}
            slider.value = text.value;
        });
    }
}

customElements.define('slider-text-input', sliderTextInput);

Plotly.plot('graph', [{
    x: [],
    y: [],
    type: 'line',
    name: 'Sine',
}, {
    x: [],
    y: [],
    type: 'line',
    name: 'Cosine',     
}], );

let source = new EventSource('http://vmzakova.fei.stuba.sk/sse/sse.php');

source.addEventListener("message", function(e) {
    console.log(e.data);
    let data = JSON.parse(e.data);
    let multiplier = document.getElementById('slider').value;
    Plotly.extendTraces('graph', { x:[[data.x]], y: [[data.y1 * multiplier]] }, [0] );
    Plotly.extendTraces('graph', { x:[[data.x]], y: [[data.y2 * multiplier]] }, [1] );
}, false);

let sine = document.getElementById('sine');
let cosine = document.getElementById('cosine');

sine.addEventListener('change', function(){
    if(sine.checked === false) {
        Plotly.restyle(document.getElementById("graph"), {"visible": false}, [0]);
    } else {
        Plotly.restyle(document.getElementById("graph"), {"visible": true}, [0]);
    }
    
});

cosine.addEventListener('change', function() {
    if(cosine.checked === false) {
        Plotly.restyle(document.getElementById("graph"), {"visible": false}, [1]);
    } else {
        Plotly.restyle(document.getElementById("graph"), {"visible": true}, [1]);
    }
});


/*, {plot_bgcolor:"lightgray", paper_bgcolor:"lightgray"} */