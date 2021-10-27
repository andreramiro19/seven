
function previewImage(image_blog) {
    var reader = new FileReader();

    reader.onload = function(e) {
        $("#selected-image").attr("src", e.target.result);
        //$("#selected-image").fadein();
    }
    reader.readAsDataURL(image_blog.files[0]);
}

$("#main-image").change(function() {
    previewImage(this);
})

$("save-blog").click(function() {
    var desc = $("main-desc").val();
    var picture = $("#main-image").prop("files")[0];




    var databaseRef = firebase.database().ref().child("Blogs");

    databaseRef.once("value").then(function(snapshot) {
    var name = picture["name"];

    var storageRef = firebase.storage().ref().child("Blog Images");
    var blogStorageRef = storageRef.child(name)

    var uploadTask = blogStorageRef.put(picture)

    uploadTask.on("state_changed",

    function complete() {
        uploadTask.snapshot.getDownloadURL().then(function(downloadUrl) {
            var blogData = {
                "image": downloadUrl,
                "description": desc
            }

            var newPostRef = database.push()

            newPostRef.set(blogData, function(err) {
                if(err) {
                    $("#result").attr("class", "alert")
                    $("#result").html(err.message)
                }
                else {
                    $("#result").html("Blog has uploaded")

                    window.open("", "_self")
                }
            })

        })
    }
    
    )
})


})




