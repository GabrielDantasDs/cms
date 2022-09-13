import { useEffect, useState } from "react"

export function Header(props) {

  const [smallScreen, setSmallScreen] = useState(false);
  
  useEffect(() => {
    window.addEventListener("resize", resize.bind(this));
    resize();
  });

  const resize = () => {
    setSmallScreen(window.innerWidth < 768);
  }

  return (
    <header id='header'>
      <div className='intro'>
        <div className='overlay'>
          <div className='container'>
            <div className='row'>
              <div className={ smallScreen ? 'col-md-offset-2 intro-text' :'col-md-8 col-md-offset-2 intro-text'}>
                <h1>
                  {props.data ? props.data.title : 'Loading'}
                  <span></span>
                </h1>
                <p>{props.data ? props.data.paragraph : 'Loading'}</p>
                <a
                  href='#features'
                  className='btn btn-custom btn-lg page-scroll'
                >
                  Learn More
                </a>{' '}
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
