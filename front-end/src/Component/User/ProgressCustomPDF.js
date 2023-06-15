import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import progress from "../../Assets/progress.png"
import {BACKEND_URI} from "../../config/config"

Font.register({
  family: 'Times New Roman',
  fontStyle: 'bold',
  fontWeight: 'bold',
  src: 'https://fonts.cdnfonts.com/css/times-new-roman', // Replace with the actual path to your font file
});
const styles = StyleSheet.create({
  body: {
    display: "flex",
    alignItems: "center"
  },
  table: {
    display: "table",
    width: "95%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 5,
  },
  table1: {
    display: "table",
    width: "95%",
    borderStyle: "solid",
    borderWidth: 1,
    borderRightWidth: 0,
    borderBottomWidth: 0,
    marginTop: 20,
  },
  tableRow: {
    margin: "auto",
    flexDirection: "row"
  },
  tableRow1: {
    margin: "auto",
    flexDirection: "row"
  },
  tableRowmap: {
    margin: "auto",
    display: "flex",
    flexDirection: "row"
  },
  tableCol2: {
    width: "30%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 10,
    fontSize: 11
  },
  tableCell1: {
    width: "70%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 10,
    fontSize: 11
  },
  tableCell3: {
    width: "100%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 10,
    fontSize: 11
  },
  tableColWeek11: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 10,
    fontSize: 11
  },
  tableColWeek12: {
    width: "60%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 10,
    fontSize: 11
  },
  tableColWeek3: {
    width: "20%",
    borderStyle: "solid",
    borderWidth: 1,
    borderLeftWidth: 0,
    borderTopWidth: 0,
    padding: 10,
    fontSize: 11
  },
  month: {
    fontWeight: 600,
    width: "95%",
    fontSize: 11,
    marginTop: 12,
    display: "flex",
    alignItems: "flex-end",
    justifyContent: "flex-end"

  },
  tableCell: {
    margin: "auto",
    marginTop: 5,
    fontSize: 10
  },
  los: {
    display: "flex",
    alignItems: "center",
    marginBottom: 15,
    flexDirection: "row"
  },
  ImageWIdth:{
    width: "20%",
    display: "flex",
    alignItems: "center",
  }, 
  textsWidth:{
    width:"80%",
    display: "flex",
    alignItems: "center",
  },
  nameStudent:{
    fontSize: 11,
    fontWeight : 700
  }



});
function ProgressCustomPDF({ data }) {

  // console.log("datadata", data);
  return (
    <Document>
      <Page size="A4" style={styles.body}>
        <View style={styles.los}>
          <View style={styles.ImageWIdth}>

          <Image src={`${BACKEND_URI}/image/${data?.image}`} style={{ width: "100px" }} />
          </View>
          <View style={styles.textsWidth}>
            {/* <Text>
              Los Angeles County Office of Education
            </Text> */}
            <Text>
              {data.program} Program
            </Text>
            <Text>
              Weekly/Monthly Progress Report
            </Text>
          </View>
        </View>
        <View style={styles.month}>
          <Text style={{ textAlign: "end" }}>
            For the month of: {data.date}
          </Text>
        </View>
        <View style={styles.table}>
          <View style={styles.tableRow}>
            <View style={styles.tableCell1}>
              <Text style={{paddingBottom: "12px"}}>Name of Student (Please Print) </Text>
              <Text >{data?.student_Name} </Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={{paddingBottom: "12px"}}>Tutoring Start Date </Text>
              <Text>{data?.tutoring_Start_Date}</Text>
            </View>
          </View>

          <View style={styles.tableRow}>
            <View style={styles.tableCell3}>
              <Text>Tutoring Agency:                Student Nest</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableCell1}>
              <Text style={{paddingBottom: "12px", fontWeight: 700}}>Tutor’s Name (Please Print) </Text>
              <Text>{data.tutor_Name}</Text>
            </View>
            <View style={styles.tableCol2}>
              <Text style={{paddingBottom: "12px"}}>Telephone Number</Text>
              <Text>{data.telephone_Number}</Text>
            </View>
          </View>
        </View>

        <View style={styles.table1}>
          <View style={styles.tableRow1}>
            <View style={styles.tableCell3}>
              <Text>Week 1</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColWeek11}>
              <Text>Goal/Obj.</Text>
            </View>
            <View style={styles.tableColWeek12}>
              <Text >Description of Objective to Meet </Text>
            </View>
            <View style={styles.tableColWeek3}>
              <Text>Objective Met</Text>
            </View>
          </View>
          {
            data?.Task_One?.map((item, index) => {
              return (
                <View style={styles.tableRowmap} >
                  <View style={styles.tableColWeek11}>
                    <Text>{item?.Goal}</Text>
                  </View>
                  <View style={styles.tableColWeek12}>
                    <Text>{item.description}</Text>
                  </View>
                  <View style={styles.tableColWeek3}>
                    <Text>{item.group1}</Text>
                  </View>
                </View>
              )
            })
          }
        </View>

        <View style={styles.table1}>
          <View style={styles.tableRow1}>
            <View style={styles.tableCell3}>
              <Text>Week 2</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColWeek11}>
              <Text>Goal/Obj.</Text>
            </View>
            <View style={styles.tableColWeek12}>
              <Text >Description of Objective to Meet </Text>
            </View>
            <View style={styles.tableColWeek3}>
              <Text>Objective Met</Text>
            </View>
          </View>
          {
            data?.Task_Two?.map((item, index) => {
              return (
                <View style={styles.tableRowmap}>
                  <View style={styles.tableColWeek11}>
                    <Text>{item?.Goal}</Text>
                  </View>
                  <View style={styles.tableColWeek12}>
                    <Text>{item?.description}</Text>
                  </View>
                  <View style={styles.tableColWeek3}>
                    <Text>{item?.group1}</Text>
                  </View>
                </View>
              )
            })
          }

        </View>
        <View style={styles.table1}>
          <View style={styles.tableRow1}>
            <View style={styles.tableCell3}>
              <Text>Week 3</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColWeek11}>
              <Text>Goal/Obj.</Text>
            </View>
            <View style={styles.tableColWeek12}>
              <Text >Description of Objective to Meet </Text>
            </View>
            <View style={styles.tableColWeek3}>
              <Text>Objective Met</Text>
            </View>
          </View>
          {
            data?.Task_Three?.map((item, index) => {
              return (
                <View style={styles.tableRowmap}>
                  <View style={styles.tableColWeek11}>
                    <Text>{item?.Goal}</Text>
                  </View>
                  <View style={styles.tableColWeek12}>
                    <Text>{item?.description}</Text>
                  </View>
                  <View style={styles.tableColWeek3}>
                    <Text>{item?.group1}</Text>
                  </View>
                </View>
              )
            })
          }

        </View>
        <View style={styles.table1}>
          <View style={styles.tableRow1}>
            <View style={styles.tableCell3}>
              <Text>Week 4</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColWeek11}>
              <Text>Goal/Obj.</Text>
            </View>
            <View style={styles.tableColWeek12}>
              <Text >Description of Objective to Meet </Text>
            </View>
            <View style={styles.tableColWeek3}>
              <Text>Objective Met</Text>
            </View>
          </View>
          {
            data?.Task_Four?.map((item, index) => {
              return (
                <View style={styles.tableRowmap}>
                  <View style={styles.tableColWeek11}>
                    <Text>{item?.Goal}</Text>
                  </View>
                  <View style={styles.tableColWeek12}>
                    <Text>{item?.description}</Text>
                  </View>
                  <View style={styles.tableColWeek3}>
                    <Text>{item?.group1}</Text>
                  </View>
                </View>
              )
            })
          }

        </View>
        <View style={styles.table1}>
          <View style={styles.tableRow1}>
            <View style={styles.tableCell3}>
              <Text>Week 5</Text>
            </View>
          </View>
          <View style={styles.tableRow}>
            <View style={styles.tableColWeek11}>
              <Text>Goal/Obj.</Text>
            </View>
            <View style={styles.tableColWeek12}>
              <Text >Description of Objective to Meet </Text>
            </View>
            <View style={styles.tableColWeek3}>
              <Text>Objective Met</Text>
            </View>
          </View>
          {
            data?.Task_Five?.map((item, index) => {
              return (
                <View style={styles.tableRowmap}>
                  <View style={styles.tableColWeek11}>
                    <Text>{item?.Goal}</Text>
                  </View>
                  <View style={styles.tableColWeek12}>
                    <Text>{item?.description}</Text>
                  </View>
                  <View style={styles.tableColWeek3}>
                    <Text>{item?.group1}</Text>
                  </View>
                </View>
              )
            })
          }

        </View>
      </Page>
    </Document>
  )
}

export default ProgressCustomPDF