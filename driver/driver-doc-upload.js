
async function uploadDriverDocs(files){
    const form = new FormData();
    form.append("idCard", files.idCard);
    form.append("license", files.license);
    form.append("carDoc", files.carDoc);
    form.append("carPhoto", files.carPhoto);

    const res = await fetch("/api/driver/upload-docs",{
        method:"POST",
        body:form
    });

    const data = await res.json();
    if(data.success){
        alert("Sənədlər yükləndi");
    }else{
        alert("Upload xətası");
    }
}
