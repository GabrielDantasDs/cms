import Head from 'next/head';
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Tabs from "@mui/material/Tabs"
import Tab from "@mui/material/Tab"
import { useState } from 'react'
import logo from '../public/images/m3.png';
import Carousel from 'react-bootstrap/Carousel';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'



export default function Home() {
    const [value, setValue] = useState('');

    const handleChange = () => {
        console.log('teste');
    };

    return (

        <div className={styles.container}>
            <header className={styles.header}>
                <div className={styles.headerLogo}>
                    <Image style={{ verticalAlign: 'middle', paddingRight: 8 }} height={100} width={100} src={logo} />
                    <span className={styles.headerLogoText}>Miriam Dantas Assistente virtual</span>
                </div>

                <Tabs centered className={styles.navBar} value={value} onChange={handleChange} aria-label="basic tabs example">
                    <Tab className={styles.navBarItem} label={<span className={styles.navBarItemText}>Inicio</span>} />
                    <Tab className={styles.navBarItem} label={<span className={styles.navBarItemText}>Sobre mim</span>} />
                    <Tab className={styles.navBarItem} label={<span className={styles.navBarItemText}>Serviços</span>} />
                    <Tab className={styles.navBarItem} label={<span className={styles.navBarItemText}>Contatos</span>} />
                </Tabs>
            </header>
            <div>
                <div className={styles.containerBody}>
                    <div className={styles.containerCarousel}>
                        <Carousel>
                            <Carousel.Item>
                                <img className={styles.carouselImage} src="/images/people.jpg"></img>
                                <Carousel.Caption>
                                    <h3>First slide label</h3>
                                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className={styles.carouselImage} src="/images/paper.jpg"></img>
                                <Carousel.Caption>
                                    <h3>Second slide label</h3>
                                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                            <Carousel.Item>
                                <img className={styles.carouselImage} src="/images/financeiro.jpg"></img>
                                <Carousel.Caption>
                                    <h3>Third slide label</h3>
                                    <p>
                                        Praesent commodo cursus magna, vel scelerisque nisl consectetur.
                                    </p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        </Carousel>
                    </div>
                    <div className={styles.firstSection}>
                        <Container>
                            <Row>
                                <Col>
                                    <FontAwesomeIcon icon="fa-light fa-coins" />
                                </Col>
                            </Row>
                        </Container>
                    </div>
                </div>
            </div>
        </div>
    )
}
