import React, { useState } from 'react'

export default function PostForm () {

    const [text, setText] = useState("")

    let handleSubmit = async (e) => {
        e.preventDefault()
        console.log('Envoi du message')
        try {
          let res = await fetch("http://localhost:4200/api/post", {
            method: "POST",
            headers: {
                'Authorization' : `Bearer ${user.token}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                userId: data.user_id,
                text: text
            }),
          })
          let resJson = await res.json()
          if (res.status === 200) {
            console.log(resJson)
          } else {
            console.log(resJson)
          }
        } catch (err) {
          console.log(err);
        }
      }


    return (
        <form className="post-form" onSubmit={handleSubmit}>
            <div className="post-form__body">
                <div className="post-form__text">
                    <label className="post-form__label" for="text">Votre message</label>
                    <textarea className="post-form__input" type="text" id="text" placeholder="Votre message" onChange={(e) => setText(e.target.value)}/>
                </div>
            </div>
            <div class="post-form__bottom">
                <button type="submit" class="post-form__submit">Envoyer</button>
            </div>
        </form>      
    )
}