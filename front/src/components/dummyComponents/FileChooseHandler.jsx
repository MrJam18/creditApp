import React, {useRef} from 'react';
import {alertHandler} from "../../utils/errorHandler";

const FileChooseHandler = ({types, sendHandler, Button, title, multiple, action}) => {
    const inputRef = useRef();
    const onChange = async () => {
        try{
            const formData = new FormData();
            const files = inputRef.current.files;
            const file = files[0];
            if(!file) return;
            const regExp = new RegExp(types + '$');
            if(file.size > 10485760) throw Error('Файл может быть не более 10 мбайт');
            if(!regExp.test(file.name)) throw Error('необходимо загрузить файл с разрешением ' + types);
            // if(multiple){
            //     for (let i = 0; i < files.length; i++) {
            //         const file = files[i];
            //         formData.append("file", file);
            //     }
            // }
            formData.append('file', file);
            await sendHandler(formData, action);
        }
        catch (e) {
            alertHandler(e, 'Ошибка при загрузке файла.')
        }

    }
 return (
  <>
      <button className={'antibutton'} title={title} style={{padding: '0 2px'}} onClick={()=> inputRef.current.click()} > <Button /> </button>
      <input onChange={onChange} multiple={multiple} ref={inputRef}  accept={types} style={{display:'none'}} type="file" id="file" name="file" />
  </>
 );
};

export default FileChooseHandler;