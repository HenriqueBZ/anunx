import {
    Avatar,
    Box,
    Card,
    CardHeader,
    CardMedia,
    Chip,
    Container,
    Grid,
    Typography
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import Carousel from 'react-material-ui-carousel'

import TemplateDefault from '../src/templates/Default'

const useStyles = makeStyles((theme) => ({
    box: {
        backgroundColor: theme.palette.background.white,
        padding: theme.spacing(3),
        marginBottom: theme.spacing(3),
    },
    productName: {
        margin: '15px 0',
    },
    price: {
        fontWeight: 'bold',
        marginBottom: 15,
    },
    card: {
        height: '100%'
    },
    cardMedia: {
        paddingTop: "56%"
    },    
}))

const Product = () => {
    const classes = useStyles()

    return (
        <TemplateDefault>
            <Container maxWidth="lg">
                <Grid container spacing={3}>
                    <Grid item xs={8}>
                        <Box className={classes.box}>
                            <Carousel
                                autoPlay={false}
                                animation='slide'
                                navButtonsAlwaysVisible
                                navButtonsProps={{
                                    style: {
                                        color: 'white'
                                    }
                                }}
                            >
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia} 
                                        image="https://source.unsplash.com/random?a=1"
                                        title="Título da Imagem"
                                    />
                                </Card>
                                <Card className={classes.card}>
                                    <CardMedia
                                        className={classes.cardMedia} 
                                        image="https://source.unsplash.com/random?a=2"
                                        title="Título da Imagem"
                                    />
                                </Card>
                            </Carousel>
                        </Box>

                        <Box className={classes.box} textAlign="left">
                            <Typography component="span" variant="caption">Publicado em 11 de dezembro 2021</Typography>
                            <Typography component="h4" variant="h4" className={classes.productName}>Tesla Model Y 2022</Typography>
                            <Typography component="h4" variant="h4" className={classes.price}>R$ 330.000,00</Typography>
                            <Chip label="Categoria" />
                        </Box>

                        <Box className={classes.box} textAlign="left">                            
                            <Typography component="h6" variant="h6">Descrição</Typography>
                            <Typography component="p" variant="body2">
                                O Tesla Model Y 2022 oferece a possibilidade de escolher entre 5 ou 7 assentos para passageiros. Com versatilidade máxima, os bancos traseiros se dobram de forma independente, criando um armazenamento flexível para toda bagagem de todos ocupantes.
                            </Typography>                            
                        </Box>
                    </Grid>
                        
                    <Grid item xs={4}>
                        <Card elevation={0} className={classes.box}>
                            <CardHeader
                                avatar={
                                    <Avatar>H</Avatar>
                                }
                                title="Henrique Zanini"
                                subheader="hiquebzanini@gmail.com"
                            />
                            <CardMedia
                                image="'https://source.unsplash.com/random'"
                                title="Henrique Zanini"
                            />
                        </Card>

                        <Box className={classes.box}>
                            <Typography component="h6" variant="h6">Localização</Typography> 
                        </Box>                        
                    </Grid>
                </Grid>
            </Container>
        </TemplateDefault>
    )
}

export default Product