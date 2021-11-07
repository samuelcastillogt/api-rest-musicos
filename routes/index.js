const { Router } = require("express")
const router = new Router();
const admin = require('firebase-admin');
const key = require('../path/serviceAccountKey.json');
admin.initializeApp({
    credential: admin.credential.cert(key)
  });
  const db = admin.firestore();
  const musicosList = db.collection('mariachi')
  const ofertasList = db.collection('ofertas')

router.get("/api/musicos", async(req, res)=>{
    const {docs}= await musicosList.get()
    const datos = docs.map(doc=>({id: doc.id, data: doc.data()}))
    res.send(datos)  
})
router.get("/api/ofertas", async(req, res)=>{
   const { docs } = await ofertasList.get()
  const ofertas = docs.map(doc=>({id: doc.id, data: doc.data()}))
  res.json(ofertas)
})
router.get("/api/ofertas/:id", async(req, res)=>{
  const { id } = req.params
  const datos = await ofertasList.doc(id).get()
 res.json(datos.data())
})
router.get("/api/musicos/:id", async(req, res)=>{
    const { id } = req.params
    const perfil = await musicosList.doc(id).get()
    const { docs } = await ofertasList.where("autor", "==", id).get()
    const publicaciones = docs.map(doc=>({id: doc.id, data: doc.data()}))
    const info = {
      perfil: perfil.data(),
      publicaciones: publicaciones
    }
    res.json(info)
  })

 router.post("/api/singup/create", async(req, res)=>{
   const nombre = req.body.nombre
   const descripcion = req.body.descripcion
   const foto = req.body.foto
   const telefono = req.body.telefono
   const web = req.body.web
   const facebook = req.body.facebook
   const categoria = req.body.categoria
   const data = { nombre, descripcion, foto, telefono, web, facebook}
    musicosList.doc().set(data).then((doc)=>{
      console.log("ya esta")
    })
  })
  router.post("/api/user/update/:id", async(req, res)=>{
    const nombre = req.body.nombre
    const descripcion = req.body.descripcion
    const foto = req.body.foto
    const telefono = req.body.telefono
    const web = req.body.web
    const facebook = req.body.facebook
    const categoria = req.body.categoria
    const data = { nombre, descripcion, foto, telefono, web, facebook, categoria}
     musicosList.doc().update(data).then((doc)=>{
       console.log("ya esta")
     })
   })
  router.post("/api/user/delete", async(req, res)=>{
     musicosList.doc("w46F49zwYkStRycWbMgc").delete().then((doc)=>{
       console.log("ya esta")
     })
   })
   router.post("/api/ofertas/update/:id", async(req, res)=>{
    const { id } = req.params
    const datos = await ofertasList.doc(id).update({
      titulo: req.body.titulo,
      autor: req.body.autor,
      imagen: req.body.imagen,
      descripcion: req.body.descripcion
    }).then(()=>{
      console.log("ya")
    })
  })
module.exports = router