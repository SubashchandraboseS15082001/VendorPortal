const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();
const port = 5000;
const axios = require("axios");
const { parseString } = require("xml2js");

app.use(bodyParser.json());
app.use(cors());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin,X-Requested-with,Content-Type,Accept"
  );
  next();
});
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

// ################ LOGIN BACKEND #########################################

app.post("/login", async (req, res) => {
  try {
    var username = req.body.user;
    var password = req.body.pass;
    // console.log(req.body);
    const url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_SCB_VENDOR_LOGIN&receiverParty=&receiverService=&interface=SI_SCB_VENDOR_LOGIN&interfaceNamespace=http://subas.com/vendor_login";
    var reqData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_VEN_LOGIN>
         <IM_VENDOR_ID>${username}</IM_VENDOR_ID>
         <IM_PASS>${password}</IM_PASS>
      </urn:ZFM_VEN_LOGIN>
   </soapenv:Body>
</soapenv:Envelope>`;
    pipo_res = axios({
      url: url,
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        Authorization: "Basic cG91c2VyQDE6MjAyMkBUZWNo",
        "Content-Type": "application/xml",
      },
      data: reqData,
    }).then((r) => {
      var xmlData = r.data;
      parseString(xmlData, function (err, result) {
        var jsonData = result;

        var status =
          jsonData["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZFM_VEN_LOGIN.Response"
          ][0]["RETURN"][0];
        var name =
          jsonData["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZFM_VEN_LOGIN.Response"
          ][0]["NAME"][0];
        res.send({ status: status, name: name });
      });
    });
  } catch (error) {
    res.send(error);
  }
});

// ############################### PROFILE ################################

app.post("/profile", async (req, res) => {
  try {
    var vendor_ID = req.body.vendor;
    const url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_VENDOR_PROFILE_S_SRI_1&receiverParty=&receiverService=&interface=SI_VENDOR_PROFILE&interfaceNamespace=http://vlogin.com";
    var reqData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZGS_VEN_PROFILE>
          <ZVEN_ID>1</ZVEN_ID>
          <IT_LFA1>
          <item>
            
             </item>
          </IT_LFA1>
       </urn:ZGS_VEN_PROFILE>
    </soapenv:Body>
 </soapenv:Envelope>`;
    pipo_res = axios({
      url: url,
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        Authorization: "Basic cG91c2VyQDE6MjAyMkBUZWNo",
        "Content-Type": "application/xml",
      },
      data: reqData,
    }).then((r) => {
      var xmlData = r.data;
      parseString(xmlData, function (err, result) {
        var name =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZGS_VEN_PROFILE.Response"
          ][0]["IT_LFA1"][0]["item"][0]["NAME1"][0];
        var ven_id =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZGS_VEN_PROFILE.Response"
          ][0]["IT_LFA1"][0]["item"][0]["LIFNR"][0];
        var city =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZGS_VEN_PROFILE.Response"
          ][0]["IT_LFA1"][0]["item"][0]["ORT01"][0];
        var postcode =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZGS_VEN_PROFILE.Response"
          ][0]["IT_LFA1"][0]["item"][0]["PSTLZ"][0];
        var region =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZGS_VEN_PROFILE.Response"
          ][0]["IT_LFA1"][0]["item"][0]["REGIO"][0];
        var street =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZGS_VEN_PROFILE.Response"
          ][0]["IT_LFA1"][0]["item"][0]["STRAS"][0];
        var country =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZGS_VEN_PROFILE.Response"
          ][0]["IT_LFA1"][0]["item"][0]["LAND1"][0];
        res.send({
          name: name,
          ven_id: parseInt(ven_id, 10),
          city: city,
          postcode: postcode,
          language: "ENG",
          country: country,
          street: street,
          region: region,
        });
      });
    });
  } catch (error) {
    res.send(error);
  }
});

// ####################### QUOTATION ######################################

app.post("/quotation", async (req, res) => {
  try {
    var vendor_ID = req.body.vendor;
    const url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_SCB_VENDOR_QUOTATION&receiverParty=&receiverService=&interface=SI_SCB_VENDOR_QUOTATION&interfaceNamespace=http://subash.com/quotation";
    var reqData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_VEN_QUOTATION>
          <IM_VENDOR_ACC>${vendor_ID}</IM_VENDOR_ACC>
          <IT_RFQ_LIST>
          </IT_RFQ_LIST>
       </urn:ZFM_VEN_QUOTATION>
    </soapenv:Body>
 </soapenv:Envelope>`;
    pipo_res = axios({
      url: url,
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        Authorization: "Basic cG91c2VyQDE6MjAyMkBUZWNo",
        "Content-Type": "application/xml",
      },
      data: reqData,
    }).then((r) => {
      var xmlData = r.data;
      parseString(xmlData, function (err, result) {
        var table = [];
        var findLength =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZFM_VEN_QUOTATION.Response"
          ][0]["IT_RFQ_LIST"][0]["item"];
        var len = findLength.length;
        for (let i = 0; i < len; i++) {
          var PO_NUMBER =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["PO_NUMBER"][0];
          var VENDOR_NAME =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["VEND_NAME"][0];
          var COMPANY_CODE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["CO_CODE"][0];
          var VENDOR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["VENDOR"][0];
          var DOC_TYPE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["DOC_TYPE"][0];
          var CREATED_ON =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["CREATED_ON"][0];
          var ITEM_INTVL =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["ITEM_INTVL"][0];
          var LAST_ITEM =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["LAST_ITEM"][0];
          var DSCNT =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["DSCNT1_TO"][0];
          var PUR_GROUP =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["PUR_GROUP"][0];
          var CASH_DISC =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["CASH_DISC1"][0];
          var CURRENCY =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["CURRENCY"][0];
          var EXCH_RATE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["EXCH_RATE"][0];
          var DOC_DATE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["DOC_DATE"][0];
          var QUOT_DEAD =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["QUOT_DEAD"][0];
          var EXCH_RATE_CM =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_QUOTATION.Response"
            ][0]["IT_RFQ_LIST"][0]["item"][i]["EXCH_RATE_CM"][0];
          table.push({
            PO_NUMBER: parseInt(PO_NUMBER, 10),
            VENDOR_NAME: VENDOR_NAME,
            COMPANY_CODE: parseInt(COMPANY_CODE, 10),
            VENDOR: parseInt(VENDOR, 10),
            DOC_TYPE: DOC_TYPE,
            CREATED_ON: CREATED_ON,
            ITEM_INTVL: parseInt(ITEM_INTVL, 10),
            LAST_ITEM: parseInt(LAST_ITEM, 10),
            DSCNT: DSCNT,
            PUR_GROUP: parseInt(PUR_GROUP, 10),
            CASH_DISC: CASH_DISC,
            CURRENCY: "INR",
            EXCH_RATE: EXCH_RATE,
            DOC_DATE: DOC_DATE,
            QUOT_DEAD: QUOT_DEAD,
            EXCH_RATE_CM: EXCH_RATE_CM,
          });
        }

        // console.log(JSON.stringify(table));

        res.send(table);
      });
    });
  } catch (error) {
    res.send(error);
  }
});

// ########################## PURCHASE ####################################

app.post("/purchase", async (req, res) => {
  try {
    var vendor_ID = req.body.vendor;
    const url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_SCB_VENDOR_PURCHASE&receiverParty=&receiverService=&interface=SI_SCB_VENDOR_PURCHASE&interfaceNamespace=http://subash.com/vendor_purchase";
    var reqData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_VEN_PURCHASE>
          <!--You may enter the following 3 items in any order-->
          <IM_VENDOR_ACC>${vendor_ID}</IM_VENDOR_ACC>
          <IT_PURCHASE_HEAD>
             <!--Zero or more repetitions:-->
             <item>
                <PO_NUMBER></PO_NUMBER>
                <CO_CODE></CO_CODE>
                <DOC_CAT></DOC_CAT>
                <DOC_TYPE></DOC_TYPE>
                <CNTRL_IND></CNTRL_IND>
                <DELETE_IND></DELETE_IND>
                <STATUS></STATUS>
                <CREATED_ON></CREATED_ON>
                <CREATED_BY></CREATED_BY>
                <ITEM_INTVL></ITEM_INTVL>
                <LAST_ITEM></LAST_ITEM>
                <VENDOR></VENDOR>
                <LANGUAGE></LANGUAGE>
                <PMNTTRMS></PMNTTRMS>
                <DSCNT1_TO></DSCNT1_TO>
                <DSCNT2_TO></DSCNT2_TO>
                <DSCNT3_TO></DSCNT3_TO>
                <CASH_DISC1></CASH_DISC1>
                <CASH_DISC2></CASH_DISC2>
                <PURCH_ORG></PURCH_ORG>
                <PUR_GROUP></PUR_GROUP>
                <CURRENCY></CURRENCY>
                <EXCH_RATE></EXCH_RATE>
                <EX_RATE_FX></EX_RATE_FX>
                <DOC_DATE></DOC_DATE>
                <VPER_START></VPER_START>
                <VPER_END></VPER_END>
                <APPLIC_BY></APPLIC_BY>
                <QUOT_DEAD></QUOT_DEAD>
                <BINDG_PER></BINDG_PER>
                <WARRANTY></WARRANTY>
                <BIDINV_NO></BIDINV_NO>
                <QUOTATION></QUOTATION>
                <QUOT_DATE></QUOT_DATE>
                <REF_1></REF_1>
                <SALES_PERS></SALES_PERS>
                <TELEPHONE></TELEPHONE>
                <SUPPL_VEND></SUPPL_VEND>
                <CUSTOMER></CUSTOMER>
                <AGREEMENT></AGREEMENT>
                <REJ_REASON></REJ_REASON>
                <COMPL_DLV></COMPL_DLV>
                <GR_MESSAGE></GR_MESSAGE>
                <SUPPL_PLNT></SUPPL_PLNT>
                <RCVG_VEND></RCVG_VEND>
                <INCOTERMS1></INCOTERMS1>
                <INCOTERMS2></INCOTERMS2>
                <TARGET_VAL></TARGET_VAL>
                <COLL_NO></COLL_NO>
                <DOC_COND></DOC_COND>
                <PROCEDURE></PROCEDURE>
                <UPDATE_GRP></UPDATE_GRP>
                <DIFF_INV></DIFF_INV>
                <EXPORT_NO></EXPORT_NO>
                <OUR_REF></OUR_REF>
                <LOGSYSTEM></LOGSYSTEM>
                <SUBITEMINT></SUBITEMINT>
                <MAST_COND></MAST_COND>
                <REL_GROUP></REL_GROUP>
                <REL_STRAT></REL_STRAT>
                <REL_IND></REL_IND>
                <REL_STATUS></REL_STATUS>
                <SUBJ_TO_R></SUBJ_TO_R>
                <TAXR_CNTRY></TAXR_CNTRY>
                <SCHED_IND></SCHED_IND>
                <VEND_NAME></VEND_NAME>
                <CURRENCY_ISO></CURRENCY_ISO>
                <EXCH_RATE_CM></EXCH_RATE_CM>
                <HOLD></HOLD>
             </item>
          </IT_PURCHASE_HEAD>
          <IT_PURCHASE_VALUES>
             <!--Zero or more repetitions:-->
             <item>
                <PO_NUMBER></PO_NUMBER>
                <PO_ITEM></PO_ITEM>
                <DELETE_IND></DELETE_IND>
                <STATUS></STATUS>
                <CHANGED_ON></CHANGED_ON>
                <SHORT_TEXT></SHORT_TEXT>
                <MATERIAL></MATERIAL>
                <PUR_MAT></PUR_MAT>
                <CO_CODE></CO_CODE>
                <PLANT></PLANT>
                <STORE_LOC></STORE_LOC>
                <TRACKINGNO></TRACKINGNO>
                <MAT_GRP></MAT_GRP>
                <INFO_REC></INFO_REC>
                <VEND_MAT></VEND_MAT>
                <TARGET_QTY></TARGET_QTY>
                <QUANTITY></QUANTITY>
                <UNIT></UNIT>
                <ORDERPR_UN></ORDERPR_UN>
                <CONV_NUM1></CONV_NUM1>
                <CONV_DEN1></CONV_DEN1>
                <CONV_NUM2></CONV_NUM2>
                <CONV_DEN2></CONV_DEN2>
                <NET_PRICE></NET_PRICE>
                <PRICE_UNIT></PRICE_UNIT>
                <NET_VALUE></NET_VALUE>
                <GROS_VALUE></GROS_VALUE>
                <QUOT_DEAD></QUOT_DEAD>
                <GR_PR_TIME></GR_PR_TIME>
                <TAX_CODE></TAX_CODE>
                <SETT_GRP1></SETT_GRP1>
                <QUAL_INSP></QUAL_INSP>
                <INFO_UPD></INFO_UPD>
                <PRNT_PRICE></PRNT_PRICE>
                <EST_PRICE></EST_PRICE>
                <NUM_REMIND></NUM_REMIND>
                <REMINDER1></REMINDER1>
                <REMINDER2></REMINDER2>
                <REMINDER3></REMINDER3>
                <OVERDELTOL></OVERDELTOL>
                <UNLIMITED></UNLIMITED>
                <UNDER_TOL></UNDER_TOL>
                <VAL_TYPE></VAL_TYPE>
                <VAL_CAT></VAL_CAT>
                <REJ_IND></REJ_IND>
                <COMMENT></COMMENT>
                <DEL_COMPL></DEL_COMPL>
                <FINAL_INV></FINAL_INV>
                <ITEM_CAT></ITEM_CAT>
                <ACCTASSCAT></ACCTASSCAT>
                <CONSUMPT></CONSUMPT>
                <DISTRIB></DISTRIB>
                <PART_INV></PART_INV>
                <GR_IND></GR_IND>
                <GR_NON_VAL></GR_NON_VAL>
                <IR_IND></IR_IND>
                <GR_BASEDIV></GR_BASEDIV>
                <ACKN_REQD></ACKN_REQD>
                <ACKNOWL_NO></ACKNOWL_NO>
                <AGREEMENT></AGREEMENT>
                <AGMT_ITEM></AGMT_ITEM>
                <RECON_DATE></RECON_DATE>
                <AGRCUMQTY></AGRCUMQTY>
                <FIRM_ZONE></FIRM_ZONE>
                <TRADE_OFF></TRADE_OFF>
                <BOM_EXPL></BOM_EXPL>
                <EXCLUSION></EXCLUSION>
                <BASE_UNIT></BASE_UNIT>
                <SHIPPING></SHIPPING>
                <OUTL_TARGV></OUTL_TARGV>
                <NOND_ITAX></NOND_ITAX>
                <RELORD_QTY></RELORD_QTY>
                <PRICE_DATE></PRICE_DATE>
                <DOC_CAT></DOC_CAT>
                <EFF_VALUE></EFF_VALUE>
                <COMMITMENT></COMMITMENT>
                <CUSTOMER></CUSTOMER>
                <ADDRESS></ADDRESS>
                <COND_GROUP></COND_GROUP>
                <NO_C_DISC></NO_C_DISC>
                <UPDATE_GRP></UPDATE_GRP>
                <PLAN_DEL></PLAN_DEL>
                <NET_WEIGHT></NET_WEIGHT>
                <WEIGHTUNIT></WEIGHTUNIT>
                <TAX_JUR_CD></TAX_JUR_CD>
                <PRINT_REL></PRINT_REL>
                <SPEC_STOCK></SPEC_STOCK>
                <SETRESERNO></SETRESERNO>
                <SETTLITMNO></SETTLITMNO>
                <NOT_CHGBL></NOT_CHGBL>
                <CTR_KEY_QM></CTR_KEY_QM>
                <CERT_TYPE></CERT_TYPE>
                <EAN_UPC></EAN_UPC>
                <CONF_CTRL></CONF_CTRL>
                <REV_LEV></REV_LEV>
                <FUND></FUND>
                <FUNDS_CTR></FUNDS_CTR>
                <CMMT_ITEM></CMMT_ITEM>
                <BA_PARTNER></BA_PARTNER>
                <PTR_ASS_BA></PTR_ASS_BA>
                <PROFIT_CTR></PROFIT_CTR>
                <PARTNER_PC></PARTNER_PC>
                <PRICE_CTR></PRICE_CTR>
                <GROSS_WGHT></GROSS_WGHT>
                <VOLUME></VOLUME>
                <VOLUMEUNIT></VOLUMEUNIT>
                <INCOTERMS1></INCOTERMS1>
                <INCOTERMS2></INCOTERMS2>
                <ADVANCE></ADVANCE>
                <PRIOR_VEND></PRIOR_VEND>
                <SUB_RANGE></SUB_RANGE>
                <PCKG_NO></PCKG_NO>
                <STATISTIC></STATISTIC>
                <HL_ITEM></HL_ITEM>
                <GR_TO_DATE></GR_TO_DATE>
                <SUPPL_VEND></SUPPL_VEND>
                <SC_VENDOR></SC_VENDOR>
                <CONF_MATL></CONF_MATL>
                <MAT_CAT></MAT_CAT>
                <KANBAN_IND></KANBAN_IND>
                <ADDRESS2></ADDRESS2>
                <INT_OBJ_NO></INT_OBJ_NO>
                <ERS></ERS>
                <GRSETTFROM></GRSETTFROM>
                <LAST_TRANS></LAST_TRANS>
                <TRANS_TIME></TRANS_TIME>
                <SER_NO></SER_NO>
                <PROMOTION></PROMOTION>
                <ALLOC_TBL></ALLOC_TBL>
                <AT_ITEM></AT_ITEM>
                <POINTS></POINTS>
                <POINTS_UN></POINTS_UN>
                <SEASON_TY></SEASON_TY>
                <SEASON_YR></SEASON_YR>
                <SETT_GRP_2></SETT_GRP_2>
                <SETT_GRP_3></SETT_GRP_3>
                <SETT_ITEM></SETT_ITEM>
                <ML_AKT></ML_AKT>
                <REMSHLIFE></REMSHLIFE>
                <RFQ></RFQ>
                <RFQ_ITEM></RFQ_ITEM>
                <CONFIG_ORG></CONFIG_ORG>
                <QUOTAUSAGE></QUOTAUSAGE>
                <SPSTCK_PHY></SPSTCK_PHY>
                <PREQ_NO></PREQ_NO>
                <PREQ_ITEM></PREQ_ITEM>
                <MAT_TYPE></MAT_TYPE>
                <SI_CAT></SI_CAT>
                <SUB_ITEMS></SUB_ITEMS>
                <SUBTOTAL_1></SUBTOTAL_1>
                <SUBTOTAL_2></SUBTOTAL_2>
                <SUBTOTAL_3></SUBTOTAL_3>
                <SUBTOTAL_4></SUBTOTAL_4>
                <SUBTOTAL_5></SUBTOTAL_5>
                <SUBTOTAL_6></SUBTOTAL_6>
                <SUBITM_KEY></SUBITM_KEY>
                <MAX_CMG></MAX_CMG>
                <MAX_CPGO></MAX_CPGO>
                <RET_ITEM></RET_ITEM>
                <AT_RELEV></AT_RELEV>
                <ORD_REAS></ORD_REAS>
                <DEL_TYP_RT></DEL_TYP_RT>
                <PRDTE_CTRL></PRDTE_CTRL>
                <MANUF_PROF></MANUF_PROF>
                <MANU_MAT></MANU_MAT>
                <MFR_NO></MFR_NO>
                <MFR_NO_EXT></MFR_NO_EXT>
                <ITEM_CAT_EXT></ITEM_CAT_EXT>
                <PO_UNIT_ISO></PO_UNIT_ISO>
                <ORDERPR_UN_ISO></ORDERPR_UN_ISO>
                <BASE_UOM_ISO></BASE_UOM_ISO>
                <WEIGHTUNIT_ISO></WEIGHTUNIT_ISO>
                <VOLUMEUNIT_ISO></VOLUMEUNIT_ISO>
                <POINTS_UN_ISO></POINTS_UN_ISO>
                <CONF_MATL_EXTERNAL></CONF_MATL_EXTERNAL>
                <CONF_MATL_GUID></CONF_MATL_GUID>
                <CONF_MATL_VERSION></CONF_MATL_VERSION>
                <MATERIAL_EXTERNAL></MATERIAL_EXTERNAL>
                <MATERIAL_GUID></MATERIAL_GUID>
                <MATERIAL_VERSION></MATERIAL_VERSION>
                <PUR_MAT_EXTERNAL></PUR_MAT_EXTERNAL>
                <PUR_MAT_GUID></PUR_MAT_GUID>
                <PUR_MAT_VERSION></PUR_MAT_VERSION>
                <GRANT_NBR></GRANT_NBR>
                <CMMT_ITEM_LONG></CMMT_ITEM_LONG>
                <FUNC_AREA_LONG></FUNC_AREA_LONG>
                <BUDGET_PERIOD></BUDGET_PERIOD>
                <MATERIAL_LONG></MATERIAL_LONG>
                <PUR_MAT_LONG></PUR_MAT_LONG>
                <CONF_MATL_LONG></CONF_MATL_LONG>
             </item>
          </IT_PURCHASE_VALUES>
       </urn:ZFM_VEN_PURCHASE>
    </soapenv:Body>
    </soapenv:Envelope>`;
    pipo_res = axios({
      url: url,
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        Authorization: "Basic cG91c2VyQDE6MjAyMkBUZWNo",
        "Content-Type": "application/xml",
      },
      data: reqData,
    }).then((r) => {
      var xmlData = r.data;
      parseString(xmlData, function (err, result) {
        var table = [];
        var len =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZFM_VEN_PURCHASE.Response"
          ][0]["IT_PURCHASE_HEAD"][0]["item"].length;

        for (let i = 1; i < len; i++) {
          var PO_NUMBER =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_HEAD"][0]["item"][i]["PO_NUMBER"][0];
          var VENDOR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_HEAD"][0]["item"][i]["VENDOR"][0];
          var MATERIAL =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_VALUES"][0]["item"][i]["MATERIAL"][0];
          var SHORT_TEXT =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_VALUES"][0]["item"][i]["SHORT_TEXT"][0];
          var QUANTITY =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_VALUES"][0]["item"][i]["QUANTITY"][0];
          var NET_PRICE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_VALUES"][0]["item"][i]["NET_PRICE"][0];
          var GROSS_VALUE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_VALUES"][0]["item"][i]["GROS_VALUE"][0];
          var PROFIT_CTR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_VALUES"][0]["item"][i]["PROFIT_CTR"][0];
          var INFO_REC =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_VALUES"][0]["item"][i]["INFO_REC"][0];
          var CURRENCY =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_HEAD"][0]["item"][i]["CURRENCY"][0];
          var EXCH_RATE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_HEAD"][0]["item"][i]["EXCH_RATE"][0];
          var EXCH_RATE_CM =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_HEAD"][0]["item"][i]["EXCH_RATE_CM"][0];
          var TAXR_CNTRY =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_HEAD"][0]["item"][i]["TAXR_CNTRY"][0];
          var DOC_DATE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_HEAD"][0]["item"][i]["DOC_DATE"][0];
          var DOC_COND =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PURCHASE.Response"
            ][0]["IT_PURCHASE_HEAD"][0]["item"][i]["DOC_COND"][0];

          table.push({
            PO_NUMBER: PO_NUMBER,
            VENDOR: parseInt(VENDOR, 10),
            MATERIAL: parseInt(MATERIAL, 10),
            SHORT_TEXT: SHORT_TEXT,
            QUANTITY: parseInt(QUANTITY, 10),
            NET_PRICE: parseInt(NET_PRICE, 10),
            GROSS_VALUE: parseInt(GROSS_VALUE, 10),
            PROFIT_CTR: PROFIT_CTR,
            INFO_REC: INFO_REC,
            CURRENCY: CURRENCY,
            EXCH_RATE: EXCH_RATE,
            EXCH_RATE_CM: EXCH_RATE_CM,
            TAXR_CNTRY: TAXR_CNTRY,
            DOC_DATE: DOC_DATE,
            DOC_COND: DOC_COND,
          });
        }
        res.send(table);
      });
    });
  } catch (error) {
    res.send(error);
  }
});

// ################################  GOODS #################################

app.post("/vendorgoods", async (req, res) => {
  try {
    var vendor_ID = req.body.vendor;
    const url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_SCB_VENDOR_GOOODS&receiverParty=&receiverService=&interface=SI_SCB_VENDOR_GOODS&interfaceNamespace=http://subash.com/vendor_goods";
    var reqData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_VEN_GOOODS>
          <IM_VENDOR_ID>${vendor_ID}</IM_VENDOR_ID>
       </urn:ZFM_VEN_GOOODS>
    </soapenv:Body>
 </soapenv:Envelope>`;
    pipo_res = axios({
      url: url,
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        Authorization: "Basic cG91c2VyQDE6MjAyMkBUZWNo",
        "Content-Type": "application/xml",
      },
      data: reqData,
    }).then((r) => {
      var xmlData = r.data;
      parseString(xmlData, function (err, result) {
        var table = [];
        var findLength =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZFM_VEN_GOOODS.Response"
          ][0]["T_GOODS_HEAD"][0]["item"];
        var len = findLength.length;
        for (let i = 0; i < len; i++) {
          var PO_NUMBER =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_VALUES"][0]["item"][i]["PO_NUMBER"][0];
          var MAT_DOC =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_VALUES"][0]["item"][i]["MAT_DOC"][0];
          var VENDOR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_VALUES"][0]["item"][i]["VENDOR"][0];
          var MATERIAL =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_VALUES"][0]["item"][i]["MATERIAL"][0];
          var DOC_YEAR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_VALUES"][0]["item"][i]["DOC_YEAR"][0];
          var PLANT =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_VALUES"][0]["item"][i]["PLANT"][0];
          var CUSTOMER =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_VALUES"][0]["item"][i]["CUSTOMER"][0];
          var ENTRY_QNT =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_VALUES"][0]["item"][i]["ENTRY_QNT"][0];
          var ENTRY_UOM =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_VALUES"][0]["item"][i]["ENTRY_UOM"][0];
          var PO_PR_QNT =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_VALUES"][0]["item"][i]["PO_PR_QNT"][0];
          var CURRENCY =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_VALUES"][0]["item"][i]["CURRENCY"][0];
          var PSTNG_DATE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_HEAD"][0]["item"][i]["PSTNG_DATE"][0];
          var ENTRY_DATE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_HEAD"][0]["item"][i]["ENTRY_DATE"][0];
          var ENTRY_TIME =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_HEAD"][0]["item"][i]["ENTRY_TIME"][0];
          var REF_DOC_NO =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_GOOODS.Response"
            ][0]["T_GOODS_HEAD"][0]["item"][i]["REF_DOC_NO"][0];

          table.push({
            PO_NUMBER: PO_NUMBER,
            MAT_DOC: MAT_DOC,
            VENDOR: parseInt(VENDOR, 10),
            MATERIAL: parseInt(MATERIAL, 10),
            DOC_YEAR: DOC_YEAR,
            PLANT: parseInt(PLANT, 10),
            CUSTOMER: CUSTOMER,
            ENTRY_QNT: parseInt(ENTRY_QNT, 10),
            ENTRY_UOM: ENTRY_UOM,
            PO_PR_QNT: parseInt(PO_PR_QNT, 10),
            CURRENCY: CURRENCY,
            PSTNG_DATE: PSTNG_DATE,
            ENTRY_DATE: ENTRY_DATE,
            ENTRY_TIME: ENTRY_TIME,
            REF_DOC_NO: REF_DOC_NO,
          });
        }

        res.send(table);
      });
    });
  } catch (error) {
    res.send(error);
  }
});

// ################################## PAYAGE #######################################

app.post("/payage", async (req, res) => {
  try {
    var vendor_ID = req.body.vendor;
    const url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_SCB_VENDOR_PAYAGE&receiverParty=&receiverService=&interface=SI_SCB_VENDOR_PAYAGE&interfaceNamespace=http://subash.com/vendor_payage";
    var reqData = `
    <soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
   <soapenv:Header/>
   <soapenv:Body>
      <urn:ZFM_VEN_PAYAGE>
         <VENDOR_ID>${vendor_ID}</VENDOR_ID>
      </urn:ZFM_VEN_PAYAGE>
   </soapenv:Body>
</soapenv:Envelope>`;
    pipo_res = axios({
      url: url,
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        Authorization: "Basic cG91c2VyQDE6MjAyMkBUZWNo",
        "Content-Type": "application/xml",
      },
      data: reqData,
    }).then((r) => {
      var xmlData = r.data;
      parseString(xmlData, function (err, result) {
        var table = [];
        var findLength =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZFM_VEN_PAYAGE.Response"
          ][0]["IT_RESULT"][0]["item"];
        var len = findLength.length;
        for (let i = 0; i < len; i++) {
          var COMPANY_CODE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PAYAGE.Response"
            ][0]["IT_RESULT"][0]["item"][i]["COMP_CODE"][0];
          var VENDOR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PAYAGE.Response"
            ][0]["IT_RESULT"][0]["item"][i]["VENDOR"][0];
          var FISC_YEAR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PAYAGE.Response"
            ][0]["IT_RESULT"][0]["item"][i]["FISC_YEAR"][0];
          var FIS_PERIOD =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PAYAGE.Response"
            ][0]["IT_RESULT"][0]["item"][i]["FIS_PERIOD"][0];
          var DOC_NO =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PAYAGE.Response"
            ][0]["IT_RESULT"][0]["item"][i]["DOC_NO"][0];
          var ENTRY_DATE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PAYAGE.Response"
            ][0]["IT_RESULT"][0]["item"][i]["ENTRY_DATE"][0];
          var DUE_DATE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PAYAGE.Response"
            ][0]["IT_RESULT"][0]["item"][i]["BLINE_DATE"][0];
          var PSTNG_DATE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PAYAGE.Response"
            ][0]["IT_RESULT"][0]["item"][i]["PSTNG_DATE"][0];
          var LC_AMOUNT =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PAYAGE.Response"
            ][0]["IT_RESULT"][0]["item"][i]["LC_AMOUNT"][0];
          var AMT_DOCCUR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PAYAGE.Response"
            ][0]["IT_RESULT"][0]["item"][i]["AMT_DOCCUR"][0];
          var CURRENCY =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PAYAGE.Response"
            ][0]["IT_RESULT"][0]["item"][i]["CURRENCY"][0];
          var LOC_CURRCY =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_PAYAGE.Response"
            ][0]["IT_RESULT"][0]["item"][i]["LOC_CURRCY"][0];

          table.push({
            COMPANY_CODE: parseInt(COMPANY_CODE, 10),
            VENDOR: VENDOR,
            FISC_YEAR: FISC_YEAR,
            FIS_PERIOD: parseInt(FIS_PERIOD, 10),
            DOC_NO: DOC_NO,
            ENTRY_DATE: ENTRY_DATE,
            DUE_DATE: DUE_DATE,
            PSTNG_DATE: PSTNG_DATE,
            LC_AMOUNT: LC_AMOUNT,
            AMT_DOCCUR: parseInt(AMT_DOCCUR, 10),
            CURRENCY: CURRENCY,
            LOC_CURRCY: LOC_CURRCY,
          });
        }
        // console.log(table);
        res.send(table);
      });
    });
  } catch (error) {
    res.send(error);
  }
});

// ############################## Credit Debit #############################

app.post("/credit-debit", async (req, res) => {
  try {
    var vendor_ID = req.body.vendor;
    const url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_SCB_VENDOR_CREDIT&receiverParty=&receiverService=&interface=SI_SCB_VENDOR_CREDIT&interfaceNamespace=http://subash.com/vendor_payage";
    var reqData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_VEN_CRED_DEB>
          <VENDOR_ID>${vendor_ID}</VENDOR_ID>
       </urn:ZFM_VEN_CRED_DEB>
    </soapenv:Body>
 </soapenv:Envelope>`;
    pipo_res = axios({
      url: url,
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        Authorization: "Basic cG91c2VyQDE6MjAyMkBUZWNo",
        "Content-Type": "application/xml",
      },
      data: reqData,
    }).then((r) => {
      var xmlData = r.data;
      parseString(xmlData, function (err, result) {
        var credit_table = [];
        var findLength =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZFM_VEN_CRED_DEB.Response"
          ][0]["ZCREDIT"][0]["item"];
        var len = findLength.length;
        for (let i = 0; i < len; i++) {
          var KUNNR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZCREDIT"][0]["item"][i]["KUNNR"][0];
          var MATNR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZCREDIT"][0]["item"][i]["MATNR"][0];
          var WERKS =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZCREDIT"][0]["item"][i]["WERKS"][0];
          var MEINS =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZCREDIT"][0]["item"][i]["MEINS"][0];
          var BUKRS =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZCREDIT"][0]["item"][i]["BUKRS"][0];
          var BELNR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZCREDIT"][0]["item"][i]["BELNR"][0];
          var GJAHR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZCREDIT"][0]["item"][i]["GJAHR"][0];
          var BUZEI =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZCREDIT"][0]["item"][i]["BUZEI"][0];
          var KOART =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZCREDIT"][0]["item"][i]["KOART"][0];
          var XBILK =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZCREDIT"][0]["item"][i]["XBILK"][0];

          credit_table.push({
            KUNNR: parseInt(KUNNR, 10),
            MATNR: MATNR,
            WERKS: WERKS,
            MEINS: MEINS,
            BUKRS: parseInt(BUKRS, 10),
            BELNR: BELNR,
            GJAHR: GJAHR,
            BUZEI: parseInt(BUZEI, 10),
            KOART: KOART,
            XBILK: XBILK,
          });
        }

        var debit_table = [];
        var findLength =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZFM_VEN_CRED_DEB.Response"
          ][0]["ZDEBIT"][0]["item"];
        var len = findLength.length;
        for (let i = 0; i < len; i++) {
          var KUNNR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZDEBIT"][0]["item"][i]["KUNNR"][0];
          var MATNR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZDEBIT"][0]["item"][i]["MATNR"][0];
          var WERKS =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZDEBIT"][0]["item"][i]["WERKS"][0];
          var MEINS =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZDEBIT"][0]["item"][i]["MEINS"][0];
          var BUKRS =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZDEBIT"][0]["item"][i]["BUKRS"][0];
          var BELNR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZDEBIT"][0]["item"][i]["BELNR"][0];
          var GJAHR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZDEBIT"][0]["item"][i]["GJAHR"][0];
          var BUZEI =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZDEBIT"][0]["item"][i]["BUZEI"][0];
          var KOART =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZDEBIT"][0]["item"][i]["KOART"][0];
          var XBILK =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_CRED_DEB.Response"
            ][0]["ZDEBIT"][0]["item"][i]["XBILK"][0];

          debit_table.push({
            KUNNR: parseInt(KUNNR, 10),
            MATNR: MATNR,
            WERKS: WERKS,
            MEINS: MEINS,
            BUKRS: parseInt(BUKRS, 10),
            BELNR: BELNR,
            GJAHR: GJAHR,
            BUZEI: parseInt(BUZEI, 10),
            KOART: KOART,
            XBILK: XBILK,
          });
        }
        // console.log(result);
        res.send({ credit: credit_table, debit: debit_table });
      });
    });
  } catch (error) {
    res.send(error);
  }
});

// ############################### INVOICE ###################################

app.post("/invoice", async (req, res) => {
  try {
    var vendor_ID = req.body.vendor;
    const url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_SCB_VENDOR_NEW_INVOICE&receiverParty=&receiverService=&interface=SI_SCB_VENDOR_NEW_INVOICE&interfaceNamespace=http://subashVENDOR_INVOICE.com";
    var reqData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_VEN_INVOICE_2>
          <I_VEN_NO>${vendor_ID}</I_VEN_NO>
       </urn:ZFM_VEN_INVOICE_2>
    </soapenv:Body>
 </soapenv:Envelope>`;
    pipo_res = axios({
      url: url,
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        Authorization: "Basic cG91c2VyQDE6MjAyMkBUZWNo",
        "Content-Type": "application/xml",
      },
      data: reqData,
    }).then((r) => {
      var xmlData = r.data;
      parseString(xmlData, function (err, result) {
        var table = [];
        var findLength =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZFM_VEN_INVOICE_2.Response"
          ][0]["ET_HEADERLIST"][0]["item"];
        var len = findLength.length;
        for (let i = 0; i < len; i++) {
          var INV_DOC_NO =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_INVOICE_2.Response"
            ][0]["ET_HEADERLIST"][0]["item"][i]["INV_DOC_NO"][0];
          var FISC_YEAR =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_INVOICE_2.Response"
            ][0]["ET_HEADERLIST"][0]["item"][i]["FISC_YEAR"][0];
          var PSTNG_DATE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_INVOICE_2.Response"
            ][0]["ET_HEADERLIST"][0]["item"][i]["PSTNG_DATE"][0];
          var DOC_DATE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_INVOICE_2.Response"
            ][0]["ET_HEADERLIST"][0]["item"][i]["DOC_DATE"][0];
          var ENTRY_DATE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_INVOICE_2.Response"
            ][0]["ET_HEADERLIST"][0]["item"][i]["ENTRY_DATE"][0];
          var ENTRY_TIME =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_INVOICE_2.Response"
            ][0]["ET_HEADERLIST"][0]["item"][i]["ENTRY_TIME"][0];
          var COMP_CODE =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_INVOICE_2.Response"
            ][0]["ET_HEADERLIST"][0]["item"][i]["COMP_CODE"][0];
          var GROSS_AMNT =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_INVOICE_2.Response"
            ][0]["ET_HEADERLIST"][0]["item"][i]["GROSS_AMNT"][0];
          var CURRENCY =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_INVOICE_2.Response"
            ][0]["ET_HEADERLIST"][0]["item"][i]["CURRENCY"][0];
          var DIFF_INV =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_INVOICE_2.Response"
            ][0]["ET_HEADERLIST"][0]["item"][i]["DIFF_INV"][0];
          var INVOICE_STATUS =
            result["SOAP:Envelope"]["SOAP:Body"][0][
              "ns0:ZFM_VEN_INVOICE_2.Response"
            ][0]["ET_HEADERLIST"][0]["item"][i]["INVOICE_STATUS"][0];

          table.push({
            INV_DOC_NO: INV_DOC_NO,
            FISC_YEAR: FISC_YEAR,
            PSTNG_DATE: PSTNG_DATE,
            DOC_DATE: DOC_DATE,
            ENTRY_DATE: ENTRY_DATE,
            ENTRY_TIME: ENTRY_TIME,
            COMP_CODE: parseInt(COMP_CODE, 10),
            GROSS_AMNT: parseInt(GROSS_AMNT, 10),
            CURRENCY: CURRENCY,
            DIFF_INV: parseInt(DIFF_INV, 10),
            INVOICE_STATUS: INVOICE_STATUS,
          });
        }

        // console.log(result);
        res.send(table);
      });
    });
  } catch (error) {
    res.send(error);
  }
});

// ###################################### INVOICE ADOBE FORM #########################

app.post("/invoiceform", async (req, res) => {
  try {
    var vendor_ID = req.body.vendor;
    const url =
      "http://dxktpipo.kaarcloud.com:50000/XISOAPAdapter/MessageServlet?senderParty=&senderService=BC_SCB_VEN_ADOBE&receiverParty=&receiverService=&interface=SI_SCB_VEN_ADOBE&interfaceNamespace=http://subash.com/vendor_invoice_form";
    var reqData = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:urn="urn:sap-com:document:sap:rfc:functions">
    <soapenv:Header/>
    <soapenv:Body>
       <urn:ZFM_VEN_INVOICE_ADOBE_FORM>
          <VENDOR_ID>${vendor_ID}</VENDOR_ID>
       </urn:ZFM_VEN_INVOICE_ADOBE_FORM>
    </soapenv:Body>
 </soapenv:Envelope>`;
    pipo_res = axios({
      url: url,
      method: "POST",
      mode: "cors",
      cache: "no-cache",
      credentials: "include",
      headers: {
        Authorization: "Basic cG91c2VyQDE6MjAyMkBUZWNo",
        "Content-Type": "application/xml",
      },
      data: reqData,
    }).then((r) => {
      var xmlData = r.data;
      parseString(xmlData, function (err, result) {
        // console.log(result);
        var base64 =
          result["SOAP:Envelope"]["SOAP:Body"][0][
            "ns0:ZFM_VEN_INVOICE_ADOBE_FORM.Response"
          ][0]["EX_PDF"][0];
        // console.log(base64);
        res.send({ base64: base64 });
      });
    });
  } catch (error) {
    res.send(error);
  }
});
