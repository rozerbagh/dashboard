import React, { useEffect, useRef, useState } from 'react'
import validator from 'validator';
import * as Buttons from '../CustomButtons/CustomButtons'
const Tags = (props) => {

    const [tags, setTags] = React.useState([]);
    const tagInput = useRef(null);
    const [tagsSpace, setTagsSpace] = useState(null);
    const removeTag = (i) => {
        const newTags = [...tags];
        newTags.splice(i, 1);
        setTags(newTags);
    }

    const inputKeyDown = (e) => {
        console.log()
        const val = e.target.value;
        var regex = /^[a-zA-Z0-9\s]{1,9}$/
        if (e.key === 'Enter' || e.key === 'Tab' || e.code === 'Space') {
            if (val.trim().length === 0) {
                setTagsSpace('No space are allowed as the first character has space')
            } else {
                if (tags.find(tag => tag.trim().toLowerCase() === val.trim().toLowerCase())) {
                    setTagsSpace('Tag is already present')
                    return;
                }
                setTags(prevState => [...prevState, val.trim()]);
                setTagsSpace('')
                tagInput.current.value = '';
                tagInput.current.value.trim();
            }
        } else if (e.key === 'Backspace' && !val) {
            removeTag(tags.length - 1);
        }
        // if (e.code === 'Space' && val) {
        //     setTagsSpace('No space are allowed')
        //     tagInput.current.value = '';
        // } else {
        //     if ((e.key === 'Enter' && val) || (e.key === 'Tab' && val)) {
        //         if (val.includes(' ') || val.indexOf('', 0)) {
        //             setTagsSpace('No space are allowed as the first character has space')
        //         } else {
        //             if (tags.find(tag => tag.toLowerCase() === val.toLowerCase())) {
        //                 setTagsSpace('Tag is already present')
        //                 return;
        //             }
        //             setTags(prevState => [...prevState, val]);
        //             tagInput.current.value = '';
        //         }
        //     } else if (e.key === 'Backspace' && !val) {
        //         removeTag(tags.length - 1);
        //     }
        // }
    }

    useEffect(() => {
        setTags(props.tagArr)
    }, [props.tagArr])

    const handleSubmit = () => {
        props.submitHandler(tags)
    }

    return (
        <>
            <div style={{ fontSize: "0.7rem", fontWeight: 500, color: "coral" }}>{tagsSpace}</div>
            <div className="input-tag">
                <ul className="input-tag__tags">
                    {tags.map((tag, i) => (
                        <li key={tag}>
                            {tag}
                            <button type="button" onClick={() => { removeTag(i); }}>&times;</button>
                        </li>
                    ))}
                    <li className="input-tag__tags__input">
                        <input type="text"
                            onKeyDown={inputKeyDown}
                            ref={tagInput} />
                    </li>
                </ul>
            </div>
            <div style={{ fontSize: "0.7rem", fontWeight: 500, color: "green" }}>
                To add tags press Tab | Enter
            </div>
            <div className="tags__submit">
                <Buttons.MainSecondaryButton
                    onClick={handleSubmit}>
                    Submit
                </Buttons.MainSecondaryButton>
            </div>
        </>
    );
}

export default Tags;