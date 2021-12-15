import { useState } from "react";
import { Field, Formik, Form } from "formik";
import './header.css'
import './content.css'
import './article.css'

function App() {
  const [photos, setPhotos] = useState([])
  const open = url => window.open(url)
  console.log({ photos })
  return (
    <div>
      <header>
        <Formik
          initialValues={{ search: '' }}
          onSubmit={async values => {
            const response = await fetch(`https://api.unsplash.com/photos/?per_page=20&query=${values.search}`, {
              headers: {
                'Authorization': 'Client-ID ZxfmPy58lGMKhOteKBs3__1gSPPYyzd3wawY-F-OsBA'
              }
            })
            const data = await response.json()
            setPhotos(data)
          }}
        >
          <Form>
            <Field name='search'></Field>
          </Form>
        </Formik>
      </header>
      <div className="container">
        <div className="center">
          {photos.map(photo =>
            <article key={photo.id} onClick={()=> open(photo.links.html)}>
              <img src={photo.urls.regular} />
              <p>{[photo.description, photo.alt_description].join(' - ')}</p>
            </article>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
