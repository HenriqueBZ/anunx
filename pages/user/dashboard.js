import { useState } from 'react'
import axios from 'axios'

import {
  Button,
  Box,
  CardActions,  
  Container,
  Grid,
  Typography,  
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from '@material-ui/core'

import { makeStyles } from '@material-ui/core/styles'
import { useSession, getSession } from 'next-auth/client'
import Link from 'next/link'
import dbConnect from '../../src/utils/dbConnect'

import ProductsModel from '../../src/models/products'
import TemplateDefault from '../../src/templates/Default'
import Card from '../../src/components/Card'
import { formatCurrency } from '../../src/utils/currency'
import useToasty from '../../src/contexts/Toasty'

const useStyles = makeStyles((theme) => ({    
  buttonAdd: {
    margin: '30px auto 50px auto',
    display: 'inline-block',
  }
}))

const Home = ({ products }) => {
  const [productId, setProductId] = useState()
  const [removedProducts, setRemovedProducts] = useState([])
  const [openConfirmModal, setOpenConfirmModal] = useState(false)
  const [session] = useSession()
  const { setToasty } = useToasty()
  
  const classes = useStyles()

  const handleCloseModal = () => setOpenConfirmModal(false)

  const handleClickRemove = (productId) => {
    setProductId(productId)
    setOpenConfirmModal(true)
  }

  const handleConfirmRemove = () => {
    axios.delete('api/products/delete', {
      data: {
        id: productId
      }
    })
      .then(handleSuccess)
      .catch(handleError)
  }

  const handleSuccess = () => {
    setOpenConfirmModal(false)
    setRemovedProducts([...removedProducts, productId])

    setToasty({
      open: true,
      severity: 'success',
      text: 'Anúncio removido com sucesso!'
    })
  }

  const handleError = () => {
    
    setOpenConfirmModal(false)
    setToasty({
      open: true,
      severity: 'error',
      text: 'Ops, deu erro!'
    })
  }

  return (
    <TemplateDefault>
      <Dialog
        open={openConfirmModal}
        onClose={handleCloseModal}        
      >
        <DialogTitle>
          Deseja realmente remover este anúncio?
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Ao confirmar a ação, o anúncio será removido permanentemente.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>
            Cancelar
          </Button>
          <Button onClick={handleConfirmRemove} autoFocus>
            Confirmar
          </Button>
        </DialogActions>
      </Dialog>
      
      <Container maxWidth="sm">
        <Typography component="h1" variant="h2" align="center">
          Meus Anúncios
        </Typography>
        <Box textAlign="center">
          <Link href={'/user/publish'} passHref>        
            <Button variant="contained" color="primary" className={classes.buttonAdd}>
              Publicar Novo Anúncio
            </Button>
          </Link>
        </Box>
      </Container>

        {
          products.length === 0 && (
            <Typography component="div" variant="body1" align="center" color="textPrimary" gutterBottom>
              Nenhum anúncio publicado
            </Typography>
          )
        }
      
      <Container maxWidth="md">
        <Grid container spacing={4}>
          {
            products.map(product => {
              if (removedProducts.includes(product._id)) return null

              return (
                <Grid key={product._id} item xs={12} sm={6} md={4}>
                  <Card
                    image={`/uploads/${product.files[0].name}`}
                    title={product.title}
                    subtitle={formatCurrency(product.price)}
                    actions={
                      <>
                        <CardActions>
                          <Button size="small" color="primary">
                            Editar
                          </Button>
                          <Button size="small" color="primary" onClick={() => handleClickRemove(product._id)}>
                            Remover
                          </Button>
                        </CardActions>
                      </>
                    }
                  />              
                </Grid>
              )
            })
          }          
        </Grid>
      </Container>
    </TemplateDefault>
  )
}

Home.requireAuth = true

export async function getServerSideProps({ req }) {
  const session = await getSession({ req })
  await dbConnect()

  const products = await ProductsModel.find({ 'user.id': session.userId })
  
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    }
  }
}

export default Home