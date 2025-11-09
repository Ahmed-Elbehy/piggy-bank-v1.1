

/*acses Elements*/
// saver Page


if(document.title == "saver"){
    let inputSaver = document.getElementById("input-saver");
    let daySaver = document.getElementById("day-saver");
    let submitSaver = document.getElementById("submet-saver");
    let tbodySaver = document.getElementById("tbody-saver");
    let tfoot = document.querySelector("tfoot")
    let inputReason = document.getElementById("reason");
    let editingId = null;
    /* saver Page*/ 
    
    // desabled Button
    inputSaver.addEventListener("input",()=>{
        toggleButton();
    });
    daySaver.addEventListener("input",()=>{
        toggleButton();
    });
    function toggleButton(){
        if(inputSaver.value != '' && daySaver.value !=""){
            submitSaver.style.backgroundColor='green';
        }else{
            submitSaver.style.backgroundColor='#666';

        }
    };
    
    // arrays
    let allSaver = [];
    let total ;
    if(localStorage.saver){
        allSaver = JSON.parse(localStorage.saver);
    }
    
    getSaverData();
    
    // handle submit clickd
    submitSaver.onclick=function(){
        if(submitSaver.innerHTML == "إضافة"){
            if(inputSaver.value != '' && daySaver.value !=""){
                addnewsaver(inputSaver.value,daySaver.value,inputReason.value);
                sumTotal();
                elementsShow(allSaver);
                saveAmountSaver(allSaver) 
            }
        }else{
            handelUbdateData(inputSaver.value,daySaver.value,inputReason.value);
            elementsShow(allSaver);
            sumTotal();
            saveAmountSaver(allSaver);
            submitSaver.innerHTML = "إضافة";
            editingId = null;
        }
        clearInputs() 
    }
       // Delete Button
    tbodySaver.addEventListener("click",function(e){
        if(e.target.classList.contains("delete")){
            deletedSaved(e.target.closest("tr").getAttribute("id"))
            e.target.closest("tr").remove()
        }else if (e.target.classList.contains("edit")){
            showUpdateData(e.target.closest('tr').getAttribute("id"))
            editingId = e.target.closest('tr').getAttribute("id")
            e.target.innerHTML = ' جاري التعديل ...' 
            
        }
    });
        // clear inputs
    function clearInputs(){
        inputSaver.value = '';
        daySaver.value = '';
        inputReason.value = '';
    }
    // initial new saver 
    function addnewsaver(amount,day,reason){
        const newsaver ={
            id:Date.now(),
            amount:Number(amount),
            day:day,
            reason:reason
        };
        allSaver.push(newsaver);
    };

    /*initial Elements To show data*/
    //  //table spans
    function elementsShow(allSaver){

        
        tbodySaver.innerHTML = '';
        allSaver.forEach(saver=>{
            const trElement = `
                <tr id=${saver.id}>
                    <td class = 'pt-4'>${saver.day}</td>
                    <td class = 'pt-4'>${saver.amount}</td>
                    <td class = 'pt-4'>${saver.reason}</td>
                    <td>
                        <button class=" delete mt-2 btn btn-danger text-white "> 
                            <i class=" delete fa-solid fa-trash"></i>
                        </button>
                        <button class="edit mt-2 btn btn-success fs-6 text-white"> 
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                    
                </tr>
            `;
            // let hrElement = `
            //     <span id="hr" class="placeholder col-12 bg-success style="width:100%"></span>
            // `
            
            tbodySaver.innerHTML += trElement;
            submitSaver.style.backgroundColor = '#666';

            /** Old code */
            // const tr = document.createElement("tr");
            // tr.setAttribute("id",saver.id);
            // const dayTd  = document.createElement("td");
            // const amountTd = document.createElement("td");
            // dayTd.textContent = saver.day;
            // amountTd.textContent = saver.amount;
            // tr.appendChild(dayTd);
            // tr.appendChild(amountTd);
            
            // // delete button
            // const deleted = document.createElement("button");
            // deleted.textContent= "حذف";
            // deleted.className = "delete";
            // const deleteTd = document.createElement("td");
            // deleteTd.appendChild(deleted);
            // tr.appendChild(deleteTd);
            //             // reason 
            // const reasonTd = document.createElement("td");
            // reasonTd.className = "td-reason";
            // reasonTd.textContent = saver.reason;
            // tr.appendChild(reasonTd);
            // hr Element to style
            // tbodySaver.appendChild(tr);
        })
    };
    
    // count sum total
    function sumTotal(){
        

        total = allSaver.reduce((f,s)=>{
            return  f + s.amount
        },0);
        tfoot.innerHTML = '';
        const totalCount=  `
            <tr>
                <td>المجموع</td>
                <td>${total}</td>
            </tr>
        `
        tfoot.innerHTML += totalCount

        /**old Code */
        // const totalTd = document.createElement("td");
        // totalTd.textContent = 'المجموع';
        // totalSever.appendChild(totalTd);
        // const sumTd = document.createElement("td");
         // sumTd.textContent = total
        // totalSever.appendChild(sumTd);
        // // sum total
    }
    
    // save data 
    function saveAmountSaver(allSaver){
        localStorage.setItem("saver",JSON.stringify(allSaver));
        localStorage.setItem("saverTotal",JSON.stringify(total))
    }
    
    // get data
    function getSaverData(){
        let amountData = localStorage.saver;
        if(amountData){
            let amountSaver = JSON.parse(amountData);
            elementsShow(amountSaver);
        }
        sumTotal(allSaver);
    }


    
    // handle Delete Click
    function deletedSaved(saverAmountId){
        allSaver = allSaver.filter(saver => saver.id !=saverAmountId)
        sumTotal(allSaver)
        saveAmountSaver(allSaver)

        
    }
    function showUpdateData(ID){
        const saver = allSaver.find(saver =>saver.id == ID);
        if(saver){
            inputSaver.value = saver.amount;
            daySaver.value = saver.day;
            inputReason.value = saver.reason
            submitSaver.innerHTML = 'تعديل';
            submitSaver.style.backgroundColor = "#519207ff"
        } 
        
    }
    function handelUbdateData(amount,day,reason){
        const saver = allSaver.find(s=> s.id == editingId );
        if(saver){
            Object.assign(saver, {
                id:editingId ,
                amount: Number(amount),
                day: day,
                reason: reason
            });
        
        }else{
            return saver
        };

        
    }
        
}

/** expenes Elements*/


else if(document.title == "Expenses"){
    // acses On HTML Elements
    let inputExpen = document.getElementById("initial-expen");
    let dayExpen = document.getElementById("day-expen");
    let submetExpen = document.getElementById("submet-expen");
    let tbodyExpen = document.getElementById("tbody-expen");
    let tfoot = document.querySelector("tfoot");
    let inputReason = document.getElementById("reason");
    let editeId = null;

    // desable tag botton
    dayExpen.addEventListener("input",()=>{submetCheck()}
        
    ) 

    inputExpen.addEventListener("input",()=>{submetCheck()}
        
    )

    function submetCheck(){
        if(inputExpen.value != "" && dayExpen.value != ""){
            submetExpen.style.background = "green"
        }else{
            submetExpen.style.background = "#666"
        }
    }
    

    
    // explen arrat
    let allExpen = []
    let total = 0 
    if(localStorage.expen){
        allExpen = JSON.parse(localStorage.expen);
    }

    getExpenData()
    // submet
    submetExpen.onclick = function(){
        if(submetExpen.innerHTML == "إضافة"){
            if(inputExpen.value != "" && dayExpen.value != ""){
                addNewExpen(inputExpen.value,dayExpen.value,inputReason.value);
                sumExpen(allExpen)
                ShowElementExpen(allExpen);
                saveExpenData(allExpen); 

            } 
        }else{
            handelUbdateData(inputExpen.value,dayExpen.value,inputReason.value);
                ShowElementExpen(allExpen);
                sumExpen(allExpen);
                saveExpenData(allExpen); 
                submetExpen.innerHTML = "إضافة";
                editeId = null;
        }
        clearInputs()

    }

    tbodyExpen.addEventListener("click",(e)=>{
        if(e.target.classList.contains ("delete")){
            handleDeleted(e.target.closest("tr").getAttribute("id"));
            e.target.closest("tr").remove()
        }else if(e.target.classList.contains("edit")){
            showupdateData(e.target.closest('tr').getAttribute("id"));
            editeId = e.target.closest('tr').getAttribute("id");
            e.target.innerHTML='جاري التعديل ...';
        }
        
    });
    // clear Data
    function clearInputs(){
        inputExpen.value = '';
        dayExpen.value = '';
        inputReason.value = '' ;
    };

    // initial new expen
    function addNewExpen(amount,day,reason){
        const newExpen = {
            id: Date.now(),
            amount:Number(amount),
            day: day,
            reason : reason,
        };
        allExpen.push(newExpen);
    }

    function ShowElementExpen(allExpen){
        
        tbodyExpen.innerHTML = "";
        allExpen.forEach(expen =>{
            const trElement = `
                <tr id=${expen.id}>
                    <td class= "pt-4">${expen.day}</td>
                    <td class= "pt-4">${expen.amount}</td>
                    <td class= "pt-4">${expen.reason}</td>
                    <td>
                        <button class=" delete btn btn-danger mt-2">
                            <i class=" delete fa-solid fs-s fa-trash"></i>
                        </button>
                        
                        <button class=" edit btn btn-success mt-2">
                            <i class="fa-solid fa-pen-to-square"></i>
                        </button>
                    </td>
                    
                </tr>
            `
            
            tbodyExpen.innerHTML += trElement;
            submetExpen.style.backgroundColor = "#666";


            // OLD CODE
            // const tr = document.createElement("tr");
            // tr.setAttribute("id",expen.id);
            // const dayTd = document.createElement("td");
            // dayTd.textContent = expen.day;
            // const amountTd = document.createElement("td");
            // amountTd.textContent = expen.amount;
            // tr.appendChild(dayTd);
            // tr.appendChild(amountTd);

            // // Delet Button
            // const deleted = document.createElement("button");
            // deleted.textContent = "حذف";
            // deleted.className = "delete";
            // const deleteTd = document.createElement("td")
            // deleteTd.appendChild(deleted);
            // tr.appendChild(deleteTd);
            // // reason 
            // const reasonTd = document.createElement("td");
            // reasonTd.className = "td-reason";
            // reasonTd.textContent = expen.reason;
            // tr.appendChild(reasonTd);
            // hr Element to style
            // tbodyExpen.appendChild(tr);
            // tbodyExpen.innerHTML += hrElement;
            ;
        })    
    }

        // count sum total
    function sumExpen(allExpen){
        
        tfoot.innerHTML = "";
        total = allExpen.reduce ((f,s) =>{
            return f + s.amount;
        },0);
        const totalTr = `
            <tr>
                <td>المجموع</td>
                <td>${total}</td>
            </tr>
        `
        tfoot.innerHTML += totalTr
    }

    // save data 
    function saveExpenData(allExpen){
        localStorage.setItem("expen",JSON.stringify(allExpen))
        localStorage.setItem("expenTotal",JSON.stringify(total))
    }
    function getExpenData(){
        let data = localStorage.expen;
        if(data){
            let expen = JSON.parse(data);
            ShowElementExpen(expen);
        }
        sumExpen(allExpen)
    }

     // handleDeleted
    function handleDeleted(expenId){
        allExpen = allExpen.filter( expen=> expen.id != expenId)
        sumExpen(allExpen);
        saveExpenData(allExpen)
    }
    function showupdateData(Id){
        const expen = allExpen.find(ex => ex.id == Id);
        if(expen){
            inputExpen.value = expen.amount;
            dayExpen.value = expen.day;
            inputReason.value = expen.reason;
            submetExpen.innerHTML = "تعديل";
            submetExpen.style.backgroundColor = "#519207ff"
        }  
    }
    function handelUbdateData(amount,day,reason){
        const expen = allExpen.find(ex=> ex.id == editeId);
        if(expen){
            Object.assign(expen,
                {
                    id:editeId,
                    amount : Number(amount),
                    day: day,
                    reason: reason
                });

        }
    }

}else{
    let sumAll = document.getElementById ("total")
    let saverTotal;
    let expenTotal;
    if (localStorage.saverTotal != null){
        saverTotal = JSON.parse(localStorage.saverTotal)
    }else{
        saverTotal = 0 
    }
    if (localStorage.expenTotal != null){
        expenTotal =  JSON.parse(localStorage.expenTotal)
    }else{
        expenTotal= 0 
    }
    sumAll.innerHTML = saverTotal - expenTotal ;
}



































