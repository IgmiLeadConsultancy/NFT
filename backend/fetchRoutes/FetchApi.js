const express=require('express');
const router= express.Router();


// ********** All Models *********** //

const arts = require("../models/productmodel");
const categories = require("../models/categorymodel");
const about_us=require('../models/aboutUs');
const adminpolicies=require('../models/admin-policy');
const privacypolicies=require('../models/privacy-policy');
const contactus=require('../models/contactUs.Js');
const faqs=require('../models/faq');
const tncs=require('../models/tncmodel');
const nfts=require('../models/nfts');
const emails=require('../models/emails');
const sliders=require('../models/sliders');
const contents=require('../models/contents');
const usersadds=require('../models/addUsers');
const GeneralSettingsModel=require('../models/GeneralSettingsModel');
const wallets = require('../models/walletsModels');
const currencies = require("../models/currencyModel");
const exploreArts = require("../models/addOwnProduct");

// ********** All Models Ends Here *********** //

    router.get("/Fetch-Products", async (req, resp) => {
        try {
          const fetchProductData = await arts.find();
          resp.json(fetchProductData);
        } catch (error) {
          resp.json(error);
        }
      });
      
      
      router.get("/Fetch-Categories", async (req, resp) => {
        try {
          const fetchcategoriesData = await categories.find();
          resp.json(fetchcategoriesData);
        } catch (error) {
          resp.json(error);
        }
      });
      
      
      router.get("/Fetch-About", async (req, resp) => {
        try {
          const fetchAbouUs = await about_us.findOne();
          resp.json(fetchAbouUs);
        } catch (error) {
          resp.json(error);
        }
      });
      
      
      router.get("/Fetch-AdminPolicy", async (req, resp) => {
        try {
          const fetchAdminPolicy = await adminpolicies.findOne();
          resp.json(fetchAdminPolicy);
        } catch (error) {
          resp.json(error);
        }
      });
      
      
      router.get("/Fetch-PrivacyPolicy", async (req, resp) => {
        try {
          const fetchPrivacyPolicy = await privacypolicies.findOne();
          resp.json(fetchPrivacyPolicy);
        } catch (error) {
          resp.json(error);
        }
      });
      
      router.get("/Fetch-ContactUs", async (req, resp) => {
        try {
          const fetchContactUs = await contactus.findOne();
          resp.json(fetchContactUs);
        } catch (error) {
          resp.json(error);
        }
      });
      
      router.get("/Fetch-Faq", async (req, resp) => {
        try {
          const fetchFaq = await faqs.find();
          resp.json(fetchFaq);
        } catch (error) {
          resp.json(error);
        }
      });
      
      
      router.get("/Fetch-TnC", async (req, resp) => {
        try {
          const fetchTnCData = await tncs.findOne();
          resp.json(fetchTnCData);
        } catch (error) {
          resp.json(error);
        }
      });

      router.get("/NftsData", async (req, resp) => {
        try {
          const nftsData = await nfts.findOne();
          resp.json(nftsData);
        } catch (error) {
          resp.json(error);
        }
      });

      router.get("/emailsData", async (req, resp) => {
        try {
          const emailsData = await emails.findOne();
          resp.json(emailsData);
        } catch (error) {
          resp.json(error);
        }
      });

      router.get("/slidersData", async (req, resp) => {
        try {
          const slidersData = await sliders.find();
          resp.json(slidersData);
        } catch (error) {
          resp.json(error);
        }
      });


      router.get("/contentsData", async (req, resp) => {
        try {
          const contentsData = await contents.findOne();
          resp.json(contentsData);
        } catch (error) {
          resp.json(error);
        }
      });

      router.get("/usersFetching", async (req, resp) => {
        try {
          const usersData = await usersadds.find();
          resp.json(usersData);
        } catch (error) {
          resp.json(error);
        }
      });




      router.get("/getuser/:id",async(req,resp)=>{

            try {
              console.log(req.params);
              const {id}=req.params;
              const UserIndividual=await usersadds.findById({_id:id});
              console.log(UserIndividual);
              resp.status(201).json(UserIndividual);

            } catch (error) {
              console.log(error);
            }

      });


      router.get("/getcategory/:id",async(req,resp)=>{

        try {
          console.log(req.params);
          const {id}=req.params;
          const CategotyIndividually=await categories.findById({_id:id});
          console.log(CategotyIndividually);
          resp.status(201).json(CategotyIndividually);

        } catch (error) {
          console.log(error);
        }

      });



      router.get("/getarts/:id",async(req,resp)=>{

        try {
          console.log(req.params);
          const {id}=req.params;
          const productsIndidually=await arts.findById({_id:id});
          console.log(productsIndidually);
          resp.status(201).json(productsIndidually);

        } catch (error) {
          console.log(error);
        }

      });


      router.get("/getWallets/:id",async(req,resp)=>{

        try {
          console.log(req.params);
          const {id}=req.params;
          const productsIndidually=await wallets.findById({_id:id});
          console.log(productsIndidually);
          resp.status(201).json(productsIndidually);

        } catch (error) {
          console.log(error);
        }

      });



      router.get("/getcurrencies/:id",async(req,resp)=>{

        try {
          console.log(req.params);
          const {id}=req.params;
          const currenciesIndividually=await currencies.findById({_id:id});
          console.log(currenciesIndividually);
          resp.status(201).json(currenciesIndividually);

        } catch (error) {
          console.log(error);
        }

      });



      router.get("/Fetch-Suspended-Users", async (req, resp) => {
        let status="Deactive"
        const fetvhSuspendUsers = await usersadds.find({ status:status });
        resp.json(fetvhSuspendUsers);
      });


      router.get("/pendingEmailUsers", async (req, resp) => {
        let status="Pending"
        const fetvhSuspendUsers = await usersadds.find({ EmailPending:status });
        resp.json(fetvhSuspendUsers);
      });



      router.get("/FetchGeneralsettings", async (req, resp) => {
        const generealSettingsData = await GeneralSettingsModel.find();
        resp.json(generealSettingsData);
      });

      router.get("/wallets", async (req, resp) => {
        const walletsData = await wallets.find();
        resp.json(walletsData);
      });


      router.get("/currencies", async (req, resp) => {
        const currencyData = await currencies.find();
        resp.json(currencyData);
      });



      router.get("/Fetch-All-Users-Arts", async (req, resp) => {
        try {
          const fetchAllUsersArts = await exploreArts.find();
          resp.json(fetchAllUsersArts);
        } catch (error) {
          resp.json(error);
        }
      });
      








module.exports=router;
  