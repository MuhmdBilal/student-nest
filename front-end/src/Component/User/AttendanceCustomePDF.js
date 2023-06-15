import React from 'react'
import { Page, Text, View, Document, StyleSheet, Image, Font } from '@react-pdf/renderer';
import progress from "../../Assets/progress.png"
import {convert24HoursTo12HoursWithOutAnyFunction} from "../../Convertor"
import {BACKEND_URI} from "../../config/config"
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
        borderBottomWidth: 0
    },
    table12: {
        display: "table",
        width: "95%",
        borderStyle: "solid",
        borderWidth: 1,
        borderRightWidth: 0,
        borderBottomWidth: 0,
        marginTop: 15
    },
    tableRow: {
        margin: "auto",
        flexDirection: "row",
        display: "flex",
        alignItems: "flex-start",
        textAlign: "start"
    },
    tableCol: {
        width: "50%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 700,
        paddingLeft: 5,
        fontSize: 10,
        textAlign: "start",
        paddingTop: 7,
        paddingBottom: 7

    },
    tableCol1: {
        width: "30%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 700,
        paddingLeft: 5,
        fontSize: 10,
        textAlign: "start",
        paddingTop: 7,
        paddingBottom: 7
    },
    tableCol122: {
        width: "40%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 700,
        paddingLeft: 5,
        fontSize: 10,
        textAlign: "start",
        paddingTop: 7,
        paddingBottom: 7
    },
    tableCol33: {
        width: "40%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 700,
        paddingLeft: 5,
        fontSize: 10,
        textAlign: "start",
        paddingTop: 7,
        paddingBottom: 7
    },
    tableCol44: {
        width: "60%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 700,
        paddingLeft: 5,
        fontSize: 10,
        textAlign: "start",
        paddingTop: 7,
        paddingBottom: 7
    },
    tableCol55: {
        width: "20%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 700,
        paddingLeft: 5,
        fontSize: 12,
        textAlign: "center",
        backgroundColor: '#c7c7c7',
        paddingTop: 10,
        paddingBottom: 10
    },
    tableCol551: {
        width: "20%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 700,
        paddingLeft: 5,
        fontSize: 11,
        textAlign: "center",

        paddingTop: 10,
        paddingBottom: 10
    },
    tableCol66: {
        width: "15%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 700,
        paddingLeft: 5,
        fontSize: 12,
        textAlign: "center",
        backgroundColor: '#c7c7c7',
        paddingTop: 10,
        paddingBottom: 10
    },
    tableCol661: {
        width: "15%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 700,
        paddingLeft: 5,
        fontSize: 11,
        textAlign: "center",
        paddingTop: 10,
        paddingBottom: 10
    },
    tableCol77: {
        width: "35%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 700,
        paddingLeft: 5,
        fontSize: 12,
        textAlign: "center",
        backgroundColor: '#c7c7c7',
        paddingTop: 10,
        paddingBottom: 10
    },
    tableCol771: {
        width: "35%",
        borderStyle: "solid",
        borderWidth: 1,
        borderLeftWidth: 0,
        borderTopWidth: 0,
        fontWeight: 700,
        paddingLeft: 5,
        fontSize: 11,
        textAlign: "center",

        paddingTop: 10,
        paddingBottom: 10
    },
    tableCell: {
        margin: "auto",
        marginTop: 5,
        fontSize: 10,
        textAlign: "start",

    },
    comany: {
        fontSize: 10,
        fontWeight: 700
    },
    comany1: {
        fontSize: 11,
        fontWeight: 700,
        color: "#4a78d4"

    },
    mainCompanyBorder: {
        width: "95%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        marginBottom: 15,
        marginTop: 15
    },
    importantText: {
        width: "95%",
        fontSize: 11,
        marginTop: 10
    },
    servicesText: {
        width: "95%",
        fontSize: 10,
        marginTop: 10
    },
    los: {
        display: "flex",
        alignItems: "center",
        marginBottom: 15,
        flexDirection: "row"
    },
    ImageWIdth: {
        width: "20%",
        display: "flex",
        alignItems: "center",
    },
    textsWidth: {
        width: "80%",
        display: "flex",
        alignItems: "center",
    },
    tableRowmap: {
        margin: "auto",
        display: "flex",
        flexDirection: "row"
    },

});
function AttendanceCustomePDF({ data }) {
    console.log("data", data.program);
    return (
        <Document>
            <Page style={styles.body}>

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
                            Monthly Attendance Report
                        </Text>
                    </View>
                </View>


                <View style={styles.mainCompanyBorder}>
                    <Text style={styles.comany}>Company: <Text style={{ fontSize: 10 }}>StudentNest, Inc</Text></Text>
                    <Text style={styles.comany}>Reporting for Month of: <Text style={{ fontSize: 10 }}>{data.date}</Text></Text>
                </View>
                <View style={styles.table}>

                    <View></View>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={{ paddingBottom: 5 }}>STUDENT'S NAME:</Text>
                            <Text>{data?.student_Name}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={{ paddingBottom: 5 }}>GRADE: </Text>
                            <Text>{data?.Grade}</Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol1}>
                            <Text style={{ paddingBottom: 5 }}>TUTORING START DATE</Text>
                            <Text>{data?.tutoring_Start_Date}</Text>
                        </View>
                        <View style={styles.tableCol1}>
                            <Text style={{ paddingBottom: 5 }}>PROJECTED END DATE: </Text>
                            <Text>{data?.project_End_Date}</Text>
                        </View>
                        <View style={styles.tableCol122}>
                            <Text style={{ paddingBottom: 5 }}>TUTOR'S FULL NAME (FIRST LAST):  </Text>
                            <Text>{data?.tutor_Name}</Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol}>
                            <Text style={{ paddingBottom: 5 }}>CAREGIVER'S NAME:</Text>
                            <Text>{data?.caregiver_Name}</Text>
                        </View>
                        <View style={styles.tableCol}>
                            <Text style={{ paddingBottom: 5 }}>CAREGIVER'S TELEPHONE NUMBER:</Text>
                            <Text>{data?.caregiver_Telephone_Number}</Text>
                        </View>
                    </View>

                    <View style={styles.tableRow}>
                        <View style={styles.tableCol33}>
                            <Text style={{ paddingBottom: 5 }}>PREVIOUS HOURS TUTORED:</Text>
                            <Text>{data?.Previous_Hours_Tutored}</Text>
                        </View>
                        <View style={styles.tableCol44}>
                            <Text style={{ paddingBottom: 5 }}>HOURS TUTORED THIS MONTH:</Text>
                            <Text>{data.hoursTutoredThisMonth}</Text>
                        </View>
                    </View>

                </View>

                <View style={styles.importantText}>
                    <Text>IMPORTANT INFORMATION FOR CAREGIVERS:</Text>
                    <Text style={styles.servicesText}>
                        Services are for one-on-one in-home or virtual tutoring. Services are only provided to students referred through the LACOE GAIN Children of CalWORKs Tutoring Program. Tutoring sessions may be provided in half-hour increments for up to four (4) hours per week. Each student may only receive the agreed upon number of hours of tutoring for the current academic year. Caregivers, at the end of each month, please sign and date in the space provided at the bottom of this form to verify the dates, start times, end times, and hours of tutoring provided.
                    </Text>
                    <Text style={{ marginTop: 10 }}>INSTRUCTIONS:</Text>
                    <Text style={styles.servicesText}>Tutors, please accurately complete the table below for each tutoring session provided. At the end of each month please sign and date in the space provided at the bottom of this form.</Text>
                </View>
                <View style={styles.table12}>
                    <View style={styles.tableRow}>
                        <View style={styles.tableCol55}>
                            <Text>Date </Text>
                        </View>

                        <View style={styles.tableCol66}>
                            <Text>Start Time  </Text>
                        </View>

                        <View style={styles.tableCol66}>
                            <Text>End Time </Text>
                        </View>

                        <View style={styles.tableCol66}>
                            <Text># Hours </Text>
                        </View>

                        <View style={styles.tableCol77}>
                            <Text>Goal from SLP</Text>
                        </View>
                    </View>
                    {
                        data?.Attendance_value?.map((item) => {
                            return (
                                <View style={styles.tableRowmap}>
                                    <View style={styles.tableCol551}>
                                        <Text>{item?.Date} </Text>
                                    </View>

                                    <View style={styles.tableCol661}>
                                        <Text>{convert24HoursTo12HoursWithOutAnyFunction(item.Start_Time)}</Text>
                                    </View>

                                    <View style={styles.tableCol661}>
                                        <Text>{convert24HoursTo12HoursWithOutAnyFunction(item.End_Time)}</Text>
                                    </View>

                                    <View style={styles.tableCol661}>
                                        <Text>{item.Hours}</Text>
                                    </View>

                                    <View style={styles.tableCol771}>
                                        <Text>{item?.Goal_from_SLP}</Text>
                                    </View>
                                </View>
                            )
                        })
                    }

                </View>

                <View style={styles.importantText}>
                    <Text>CAREGIVER CERTIFICATION AND SIGNATURE</Text>
                    <Text style={styles.servicesText}>
                        I hereby certify under penalty of perjury that the information contained on this form is true and correct for services provided.
                    </Text>
                </View>

                <View style={styles.mainCompanyBorder}>
                    <Text style={styles.comany1}>Caregiver’s Signature: ______________________________</Text>
                    <Text style={styles.comany}>Date: ____________________</Text>
                </View>

                <View style={styles.importantText}>
                    <Text>TUTOR CERTIFICATION AND SIGNATURE</Text>
                    <Text style={styles.servicesText}>
                        I hereby certify under penalty of perjury that the information contained on this form is true and correct.I understand that any material misrepresentation may subject me to non-payment for services that I have provided and possible criminal and/or civil actions.
                    </Text>
                </View>

                <View style={styles.mainCompanyBorder}>
                    <Text style={styles.comany1}>Tutor’s Signature: ______________________________</Text>
                    <Text style={styles.comany}>Date: ____________________</Text>
                </View>

                <View style={styles.importantText}>
                    <Text>AGENCY CERTIFICATION AND SIGNATURE (<Text style={{ color: "red" }}>When parent signature is not available after 3 attempts</Text>)</Text>
                    <Text style={styles.servicesText}>
                        I hereby certify under penalty of perjury that the information contained on this form is true and correct. I understand that any material misrepresentation may subject me to non-payment for services that I have provided and possible criminal and/or civil actions.
                    </Text>
                </View>

                <View style={styles.mainCompanyBorder}>
                    <Text style={styles.comany1}>Agency Representative Signature:  ________________________</Text>
                    <Text style={styles.comany}>Date: ____________________</Text>
                </View>

            </Page>
        </Document>
    )
}

export default AttendanceCustomePDF