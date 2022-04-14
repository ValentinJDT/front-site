import {useState} from "react";
import {Helmet} from "react-helmet-async";
import parse from "html-react-parser";
import showdown from "showdown";

const Dev = () => {
    const title = "Dev";

    const [prod, setProd] = useState();


    const handleButt = () => {

        const inputFile = document.getElementById("inputFile");
        let file = inputFile.files[0];

        function setBase64File(file) {
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => {
                console.log(reader.result);
                setProd(reader.result);
            };
            reader.onerror = (error) => {
                console.log('Error: ', error);
            };
        }
    }

    const m = new showdown.Converter({'ghCodeBlocks': true});
    const message = "**coucou** [press](javascript:alert('qzdqzd')) ![](https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/640px-Image_created_with_a_mobile_phone.png)";

    const render = parse(m.makeHtml(message));

    return (
        <>
            <div>
                <Helmet>
                    <title>{title} | Afterwork</title>
                </Helmet>
            </div>

            <>
                <h1>{title}</h1>

                <input type={"file"} id={"inputFile"}/>
                <button type={"button"} onClick={handleButt}>Clique</button>

                <img src={prod} alt={"qzdliq"}/>

                <hr/>

                {render}
            </>
        </>
    );
}

export default Dev;
