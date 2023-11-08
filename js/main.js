window.onload = () => {
    const text = document.querySelector('#form__text');
    const theme = document.querySelector('#form__theme');
    const themeClean = document.querySelector('.inputBox__clean');
    const textBlock = document.querySelector('.form__text');
    const formCount = document.getElementById('form__count');
    const btn = document.getElementById('submit');
    const sample = document.getElementById('sample');
    const errorText = document.querySelector('.inputBox__errorText');
    const samples = [];
    const sampleBtn = document.getElementById('sample__btn');
    var flag = false;
    var sampleFlag=false;
    const select = document.getElementById('form__grade');
    const newSelect = document.getElementById('form__newGrade');
    const dropDown = document.querySelector('.form-select');
    const formGrade = document.querySelector('.form__grade');
    const dropElem = document.querySelectorAll('.form-select__value');
    text.addEventListener('input', ()=>{
        var count = text.value.length;
        formCount.innerHTML = `${count} / 200`;
        if(count>200){
            textBlock.classList.add('inputBox--error');
        }
        else{
            textBlock.classList.remove('inputBox--error');
        }
        if(count>0&&count<=200){
            flag=true;
            errorText.style.display = 'none';
        }
        else{
            flag=false;
            if(count==0){
                errorText.style.display = 'block';
                errorText.innerHTML = 'Enter your theme';
            }
            if(count>200){
                errorText.style.display = 'block';
                errorText.innerHTML = 'Too many symbols';
            }
        }
        if(theme.value.length!=0){
            checkFlag(flag);
        }
    });

    theme.addEventListener('input', ()=>{
        var count = theme.value.length;
        if(count>0){
            flag=true;
            themeClean.style.display = 'flex';
        }
        else{
            flag=false;
            themeClean.style.display = 'none';
        }
        if(text.value.length!=0){
            checkFlag(flag);
        }
    });

    themeClean.addEventListener('click', ()=>{
        theme.value = '';
        themeClean.style.display = 'none';
        flag=false;
        checkFlag(flag);
    });

    btn.addEventListener('click', ()=>{
        if(text.value.length > 0 && theme.value.length > 0 && text.value.length <=200){
            var samplElement = document.createElement('span');
            samplElement.classList.add('sample__item');
            samplElement.innerHTML = theme.value;
            sample.appendChild(samplElement);
            theme.value = ''; text.value = '';
            flag=false;
            btn.classList.add('btn--disabled');
            btn.classList.remove('btn--enabled');
            samples.push(samplElement);
            themeClean.style.display = 'none';
            formCount.innerHTML = '0 / 200';
            newSelect.value = '1';
            select.value = 1;
        }
        if(samples.length>5){
            for(var i = 5; i<samples.length; i++){
                samples[i].style.display = 'none';
            }
        }
    });

    sampleBtn.addEventListener('click', ()=>{
        if(samples.length>5){
            if(!sampleFlag){
                for(var i = 5; i<samples.length; i++){
                    samples[i].style.display = 'block';
                    sampleFlag=true;
                    sampleBtn.innerHTML = 'Скрыть';
                }
            }
            else{
                for(var i = 5; i<samples.length; i++){
                    samples[i].style.display = 'none';
                    sampleFlag=false;
                    sampleBtn.innerHTML = 'Показать больше вариантов';
                }
            }
        }
    });

    function checkFlag(flag){
        if(flag){
            btn.classList.remove('btn--disabled');
            btn.classList.add('btn--enabled');
        }
        else{
            btn.classList.add('btn--disabled');
            btn.classList.remove('btn--enabled');
        }
    }

    newSelect.addEventListener('click', ()=>{
        if(dropDown.classList.contains('form-select--active')){
            dropDown.classList.remove('form-select--active');
            formGrade.classList.remove('form__grade--active');
        }
        else{
            dropDown.classList.add('form-select--active');
            formGrade.classList.add('form__grade--active');
        }
    });

    document.addEventListener('mouseup', (e)=>{
        if(e.target!==dropDown){
            dropDown.classList.remove('form-select--active');
            formGrade.classList.remove('form__grade--active');
        }
    });


    dropElem.forEach((i)=>{
        i.addEventListener('click', (e)=>{
            select.value = e.target.id;
            dropDown.classList.remove('form-select--active');
            newSelect.value = e.target.id;
        });
    });

    
    
}