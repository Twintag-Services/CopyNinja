document.addEventListener('DOMContentLoaded', function() {
    const dataList = document.getElementById('dataList');
    const dataNameInput = document.getElementById('dataName');
    const dataValueInput = document.getElementById('dataValue');
    const addDataForm = document.getElementById('addDataForm');
    const submitButton = document.getElementById('submitButton');
    const donateButton = document.getElementById('donateButton');
    const addButton = document.getElementById('cn-title-add');
    const formContainer = document.getElementById('cn-form-container');
    const btnPayYearly = document.getElementById('cn-yearly');
    const btnPayLifetime = document.getElementById('cn-lifetime');
  
    // Load stored data from local storage
    function loadData() {
      chrome.storage.local.get('adminData', function(result) {
        const adminData = result.adminData || [];
  
        // Clear existing data
        dataList.innerHTML = '';
  
        let iteration=0
        adminData.forEach(function(item, index) {

            //CREATE THE LINE ITEM
                 const listItem = document.createElement('div');
                       listItem.className="cn-list-item-parent";
                        //CREATE CONTAINER TITLE + CONTENT
                            const itemNameValueContainer = document.createElement('div');
                                    itemNameValueContainer.className="cn-list-item-namevalue-container"
                                        //CREATE THE TITLE
                                            const itemTitle = document.createElement('div');
                                                    itemTitle.id="cn-list-item-title-"+iteration
                                                    itemTitle.className="cn-list-item-title"
                                                    itemTitle.textContent=item.name
                                    
                                        //CREATE THE CONTENT
                                            const itemValue = document.createElement('div');
                                                    itemValue.id="cn-list-item-value-"+iteration
                                                    itemValue.innerHTML=item.value
                                                    itemValue.className="cn-list-item-value"

                                            const itemValueInput = document.createElement('textarea');
                                                    itemValueInput.id="cn-list-item-value-input-"+iteration
                                                    itemValueInput.disabled=true
                                                    itemValueInput.value=item.value
                                                    itemValueInput.className="cn-list-item-value-input"
                                        

                        //CREATE CONTROLS CONTAINER
                            const itemControlsContainer = document.createElement('div'); 
                                    itemControlsContainer.className="cn-list-item-controls-container"                                                   
                                //CREATE THE EDIT BUTTON 
                                    const editButton = document.createElement('div');
                                            editButton.className="cn-list-item-button-edit"
                                            editButton.innerHTML= '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-edit-3"><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>'     
                                            editButton.setAttribute("index-elem",iteration)  
                                            editButton.addEventListener('click', ()=> {  
                                              //HIDE ITEM VALUE
                                                itemValue.style.display="none"
                                              //ACTIVATE INPUT VALUE
                                                itemValueInput.disabled=false
                                                itemValueInput.style.display="flex"
                                                itemValueInput.focus()

                                              //HIDE BASIC CONTROLS
                                                editButton.style.display="none"
                                                copyButton.style.display="none"
                                                deleteButton.style.display="none"

                                              //SHOW EDIT CONTROLS
                                                let editControlsContainer=document.getElementById("cn-list-item-edit-controls-container-"+itemEditControlsContainer.getAttribute("index-elem")) 
                                                editControlsContainer.style.display="flex"
                                            })                              
                                //CREATE THE COPY BUTTON 
                                    const copyButton = document.createElement('div');
                                            copyButton.className="cn-list-item-button-copy"
                                            copyButton.textContent = 'Copy';
                                            copyButton.addEventListener('click', ()=> {
                                                navigator.clipboard.writeText(item.value).then(()=> {
                                                    console.log('Copied to clipboard');
                                                    copyButton.textContent="Copied!"
                                                    //setTimeout(()=>{
                                                      copyButton.textContent="Copy"
                                                      window.close()
                                                      chrome.tabs.query({active: true, currentWindow: true}, (tabs)=> {
                                                        // tabs[0] es la pestaña actual activa
                                                        chrome.tabs.sendMessage(tabs[0].id, {action: "active",value:item.name}, function(response) {
                                                          console.log(response.farewell); // Respuesta del content script
                                                        });
                                                      });
                                                    //},300)
                                                }); 
                                            });
                                //CREATE THE DELETE BUTTON 
                                    const deleteButton = document.createElement('div');
                                            deleteButton.className="cn-list-item-button-delete"
                                            deleteButton.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#FF5757" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-x"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>';
                                            deleteButton.addEventListener('click', function() {
                                               itemHelperDelete.style.display="flex"
                                               itemHelperDelete.classList.add("animate__animated")
                                               itemHelperDelete.classList.add("animate__flipInX")
                                            });

                         //CREATE EDIT CONTROLS CONTAINER 
                            const itemEditControlsContainer = document.createElement('div'); 
                                    itemEditControlsContainer.className="cn-list-item-edit-controls-container" 
                                    itemEditControlsContainer.id="cn-list-item-edit-controls-container-"+iteration
                                    itemEditControlsContainer.setAttribute("index-elem",iteration)
                                //SAVE EDIT BUTTON
                                    const saveEditButton = document.createElement('div');
                                            saveEditButton.className="cn-list-item-button-save-edit"
                                            saveEditButton.setAttribute("id","cn-list-item-button-save-edit-"+iteration)
                                            saveEditButton.textContent = 'Save';   
                                            saveEditButton.setAttribute("index-elem",iteration)
                                            saveEditButton.addEventListener('click', ()=> {
                                                //SAVE THE NEW DATA
                                                  adminData[saveEditButton.getAttribute("index-elem")] = { name: itemTitle.innerHTML, value: itemValueInput.value };
                                                  chrome.storage.local.set({ 'adminData': adminData }, function() {
                                                    loadData();  // Refrescar la lista
                                                  });

                                                //HIDE EDIT CONSTROLS
                                                  //let editControlsContainer=document.getElementById("cn-list-item-edit-controls-container-"+itemEditControlsContainer.getAttribute("index-elem")) 
                                                  itemEditControlsContainer.style.display="none"

                                                //SHOW BASIC CONTROLS
                                                  editButton.style.display="flex"
                                                  copyButton.style.display="flex"
                                                  deleteButton.style.display="flex"


                                            })
                                
                                //CANCEL EDIT BUTTON
                                const cancelEditButton = document.createElement('div');
                                        cancelEditButton.className="cn-list-item-button-cancel-edit"
                                        cancelEditButton.setAttribute("id","cn-list-item-button-cancel-edit-"+iteration)
                                        cancelEditButton.textContent = 'Cancel';   
                                        cancelEditButton.setAttribute("index-elem",iteration)
                                        cancelEditButton.addEventListener('click', ()=> {
                                            //HIDE INPUT EDIT
                                                itemValueInput.style.display="none"
                                                itemValue.style.display="flex"
                                            //HIDE EDIT CONSTROLS
                                                //let editControlsContainer=document.getElementById("cn-list-item-edit-controls-container-"+itemEditControlsContainer.getAttribute("index-elem")) 
                                                itemEditControlsContainer.style.display="none"

                                            //SHOW BASIC CONTROLS
                                              editButton.style.display="flex"
                                              copyButton.style.display="flex"
                                              deleteButton.style.display="flex"
                                        })
                        //CREATE HELPER ELEMENTS
                            const itemHelperDelete = document.createElement('div'); 
                                    itemHelperDelete.className="cn-list-item-helper-delete"
                                    itemHelperDelete.innerHTML=`
                                        <div class="cn-helper-title">Are you sure?</div>
                                        <span class="cn-helper-options">
                                          <div id="cn-helper-action-ok-${iteration}" class="cn-helper-action-ok">Yes, delete</div>
                                          <div id="cn-helper-action-ko-${iteration}" class="cn-helper-action-ko">Cancel</div>
                                        </span>
                                    `
                                    
  
            listItem.appendChild(itemNameValueContainer);
                itemNameValueContainer.appendChild(itemTitle);
                itemNameValueContainer.appendChild(itemValue);
                itemNameValueContainer.appendChild(itemValueInput);
            listItem.appendChild(itemControlsContainer);
                itemControlsContainer.appendChild(copyButton);
                itemControlsContainer.appendChild(editButton);
                itemControlsContainer.appendChild(deleteButton);
            listItem.appendChild(itemEditControlsContainer);
                itemEditControlsContainer.appendChild(saveEditButton);
                itemEditControlsContainer.appendChild(cancelEditButton);
            listItem.appendChild(itemHelperDelete);
            dataList.appendChild(listItem);



            let actionOk=document.getElementById("cn-helper-action-ok-"+iteration)
                  actionOk.addEventListener('click', ()=> {
                      adminData.splice(index, 1);
                        chrome.storage.local.set({ 'adminData': adminData }, ()=> {
                          loadData(); // Refrescar la lista
                        });
                  });
            let actionKo=document.getElementById("cn-helper-action-ko-"+iteration)
                  actionKo.addEventListener('click', ()=> {
                    itemHelperDelete.style.display="none"
                    itemHelperDelete.classList.remove("animate__animated")
                    itemHelperDelete.classList.remove("animate__flipInX")
                  });

            iteration=iteration+1
        });

        
      });
    }

  
    // Load data initially
    loadData();
  
    // Add new data
    submitButton.addEventListener('click', (event)=> {
      event.preventDefault();
  
      const newData = {
        name: dataNameInput.value,
        value: dataValueInput.value,
      };
  
      chrome.storage.local.get('adminData', (result)=> {
        let adminData = result.adminData || [];
        adminData.push(newData);
  
        chrome.storage.local.set({ 'adminData': adminData }, ()=> {
          loadData();  // Refresh the list
          addDataForm.reset();  // Reset the form

          addButton.style.display="flex"
          formContainer.style.display="none"
        });
      });
    });
  
    addButton.addEventListener('click', function() {
      addButton.style.display="none"
      formContainer.style.display="flex"
      formContainer.classList.add("animate__animated")
      formContainer.classList.add("animate__fadeIn")
      dataNameInput.focus()
    });

    btnPayYearly.addEventListener("click",()=>{
      chrome.tabs.create({ url: 'https://buy.stripe.com/eVadTG66A292g7u7sv' });
    })

    btnPayLifetime.addEventListener("click",()=>{
      chrome.tabs.create({ url: 'https://buy.stripe.com/00gcPC66A5lecVi004' });
    })



    
  });
  