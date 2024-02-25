var express = require('express');
var router = express.Router();
var connection = require('../config/database.js');


router.get('/', function (req, res, next) {
    connection.query('SELECT * FROM kategori', function (err, rows) {
        if (err) {
            req.flash('error', err);

        } else {
            res.render('kategori/index', {
                data: rows
            });
        }
    });

});

router.get('/create', function (req, res, next) {
    res.render('kategori/create', {
        nama_kategori: ''
    })
})


router.post('/store', function (req, res, next) {
    try {
        let { nama_kategori } = req.body;
        let Data = {
            nama_kategori
        }
        connection.query('insert into kategori set ?', Data, function (err, result) {
            if (err) {
                req.flash('error', 'Gagal menyimpan data!');
            } else {
                req.flash('success', 'Berhasil menyimpan data!');
            }
            res.redirect('/kategori');
        })
    } catch {
        req.flash('error', 'Terjadi kesalahan pada fungsi')
        res.redirect('/kategori')
    }
})


router.get('/edit/(:id)', function (req, res, next) {
    let id = req.params.id;
    connection.query('select * from kategori where id_kategori = ' + id, function (err, rows) {
        if (err) {
            req.flash('error', 'Query gagal');
        } else {
            res.render('kategori/edit', { 
                id: rows[0].id_kategori,
                nama_kategori: rows[0].nama_kategori
            })
        }
    })
})


router.post('/update/(:id)', function (req, res, next) {
    try {
        let id = req.params.id;
        let { nama_kategori } = req.body;
        let Data = {
            nama_kategori: nama_kategori
        }
        connection.query('update kategori set ? where id_kategori = ' + id, Data, function (err) {
            if (err) {
                req.flash('error', 'gagal memperbaharui data');
            } else {
                req.flash('success', 'Berhasil memperbaharui data baru!');
            }
            res.redirect('/kategori');
        })
    } catch {
        req.flash('error', 'terjadi kesalahan pada fungsi');
        res.render('/kategori');
    }
})

router.get('/delete/(:id)', function(req, res){
    let id = req.params.id;
    connection.query('delete from kategori where id_kategori = ' + id, function(err){
        if(err){
            req.flash('error','Gagal Menghapus data');
        }else{
            req.flash('success','Data terhapus!');
        }
        res.redirect('/kategori');
    })
})

module.exports = router;