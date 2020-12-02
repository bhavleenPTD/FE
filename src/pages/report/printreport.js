import React from 'react';
import {
	Page,
	Text,
	View,
	Image,
	Font,
	Document,
	StyleSheet,
} from '@react-pdf/renderer';
import DateShow from '../../components/Date/DateShow';
import { Container, Row, Col } from 'reactstrap';
import {
	Table,
	TableBody,
	TableCell,
	DataTableCell,
	TableHeader,
} from '@david.kucsai/react-pdf-table';
import { BorderWidth } from 'react-bootstrap-icons';
import { capitalize } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import ViewTag from './subElements/ViewTag';
import { html2json } from 'html2json';

// Create Document Component

const MyDocument = ({ data, pdfloaded }) => {
	console.log(data);
	const { report, subreports, main_image, summary } = data;

	let cd = new Date(report.createdAt);

	return (
		<Document
			onRender={() => {
				pdfloaded();
			}}
		>
			<Page size="A4" style={styles.body} wrap>
				{/* <Text style={styles.header} fixed>
					Report Id : &nbsp; {report._id}
				</Text> */}
				<View>
					<Text
						style={{
							textTransform: 'uppercase',
							textAlign: 'center',
							textDecoration: 'underline',
							fontSize: 11,
						}}
					>
						{report.confidentiality}
					</Text>

					<Text style={styles.pageCount}>
						Page No :{' '}
						<Text
							style={styles.pageNumber}
							render={({ pageNumber, totalPages }) => `${pageNumber} `}
							fixed
						/>
					</Text>
					<Text
						style={{
							textAlign: 'right',
							marginRight: 50,
							fontSize: 11,
							fontWeight: 'ultralight',
							color: '#303030',
						}}
					>
						COPY No.:{' '}
					</Text>
					<Text style={{ marginTop: '3%', ...styles.address }}>
						AVIATION RESEARCH CENTRE
					</Text>
					<Text style={{ ...styles.address }}>
						DIRECTORATE GENERAL OF SECURITY
					</Text>
					<Text style={{ ...styles.address }}> CABINET SECRETARIATE</Text>
					<Text
						style={{
							marginTop: '3%',
							textDecoration: 'underline',
							...styles.address,
						}}
					>
						IMINT Report No.-{report.s_reportId}
					</Text>
					<Text style={{ textDecoration: 'underline', ...styles.address }}>
						({report.areas})
					</Text>
					<Text
						style={{
							textDecoration: 'underline',
							...styles.address,
							textTransform: capitalize,
						}}
					>
						(As on{' '}
						{cd.getDate() + '-' + (cd.getMonth() + 1) + '-' + cd.getFullYear()})
					</Text>
					<Text
						style={{
							marginTop: '4%',
							marginBottom: '2%',
							...styles.sensorDetails,
							textDecoration: 'underline',
						}}
					>
						1. Sensor Details
					</Text>
				</View>
				<View>
					<Table
						data={[
							{
								sensor_id: report.xml.sensor_id,
								date:
									cd.getDate() +
									'-' +
									(cd.getMonth() + 1) +
									'-' +
									cd.getFullYear(),
								resolution: report.xml.resolution,
								orbit_no: report.xml.orbit_no,
							},
						]}
					>
						<TableHeader textAlign={'center'}>
							<TableCell
								style={{
									fontSize: 11,
									padding: 4,
									fontWeight: 'ultralight',
									color: '#303030',
								}}
							>
								Sensor
							</TableCell>
							<TableCell
								style={{
									fontSize: 11,
									padding: 4,
									fontWeight: 'ultralight',
									color: '#303030',
								}}
							>
								Date
							</TableCell>
							<TableCell
								style={{
									fontSize: 11,
									padding: 4,
									fontWeight: 'ultralight',
									color: '#303030',
								}}
							>
								Resolution
							</TableCell>
							<TableCell
								style={{
									fontSize: 11,
									padding: 4,
									fontWeight: 'ultralight',
									color: '#303030',
								}}
							>
								Orbit No.
							</TableCell>
						</TableHeader>
						<TableBody textAlign={'center'}>
							<DataTableCell
								getContent={(r) => r.sensor_id}
								style={{
									fontSize: 11,
									padding: 4,
									fontWeight: 'ultralight',
									color: '#303030',
								}}
							/>
							<DataTableCell
								getContent={(r) => r.date}
								style={{
									fontSize: 11,
									padding: 4,
									fontWeight: 'ultralight',
									color: '#303030',
								}}
							/>
							<DataTableCell
								getContent={(r) => r.resolution}
								style={{
									fontSize: 11,
									padding: 4,
									fontWeight: 'ultralight',
									color: '#303030',
								}}
							/>
							<DataTableCell
								getContent={(r) => r.orbit_no}
								style={{
									fontSize: 11,
									padding: 4,
									fontWeight: 'ultralight',
									color: '#303030',
								}}
							/>
						</TableBody>
					</Table>
				</View>
				<Text
					style={{
						marginTop: '2%',
						...styles.points,
					}}
				>
					2.{' '}
					<Text
						style={{ ...styles.sensorDetails, textDecoration: 'underline' }}
					>
						General Area
					</Text>
					{'                    '}:{'     '}
					<Text
						style={{
							fontWeight: 'ultralight',
							color: '#353535',
							textTransform: 'capitalize',
						}}
					>
						{report.location_name}
					</Text>
				</Text>
				<Text
					style={{
						marginTop: '3%',
						...styles.points,
					}}
				>
					3.{' '}
					<Text
						style={{ ...styles.sensorDetails, textDecoration: 'underline' }}
					>
						Target Reported
					</Text>
					{'             '}:{'     '}
					<Text
						style={{
							fontWeight: 'ultralight',
							color: '#353535',
							textTransform: 'capitalize',
						}}
					>
						{report.target_reported}
					</Text>
				</Text>
				<Text
					style={{
						marginTop: '3%',
						...styles.points,
					}}
				>
					4.{' '}
					<Text
						style={{ ...styles.sensorDetails, textDecoration: 'underline' }}
					>
						Indent Reference
					</Text>
					{'           '}:{'     '}
					<Text
						style={{
							fontWeight: 'ultralight',
							color: '#353535',
							textTransform: 'capitalize',
						}}
					>
						{report.indent_reference}
					</Text>
				</Text>
				<Text
					style={{
						marginTop: '3%',
						...styles.points,
					}}
				>
					5.{' '}
					<Text
						style={{ ...styles.sensorDetails, textDecoration: 'underline' }}
					>
						Enclosures{' '}
					</Text>
					{'                      '}:{'     '}
				</Text>
				<View style={{ marginLeft: '5%' }}>
					<Text
						style={{
							marginTop: '3%',
							...styles.points,
						}}
					>
						{' '}
						a) {'   '}HARD COPY DETAILS:
					</Text>

					<Table
						data={[
							{
								album_no: 1,
								illustrations: subreports.length,
								appendix: 'A',
							},
						]}
					>
						<TableHeader textAlign={'center'}>
							<TableCell
								style={{
									textTransform: 'uppercase',
									fontSize: 11,
									padding: 4,
								}}
							>
								ALBUM (Nos.)
							</TableCell>
							<TableCell
								style={{
									textTransform: 'uppercase',
									fontSize: 11,
									padding: 4,
								}}
							>
								ILLUSTRATIONS PER ALBUMS (Nos.)
							</TableCell>
							<TableCell
								style={{
									textTransform: 'uppercase',
									fontSize: 11,
									padding: 4,
								}}
							>
								APPENDIX(1 No.)
							</TableCell>
						</TableHeader>
						<TableBody textAlign={'center'}>
							<DataTableCell
								getContent={(r) => r.album_no}
								style={{
									textTransform: 'uppercase',
									fontSize: 11,
									padding: 4,
								}}
							/>
							<DataTableCell
								getContent={(r) => r.illustrations}
								style={{
									textTransform: 'uppercase',
									fontSize: 11,
									padding: 4,
								}}
							/>
							<DataTableCell
								getContent={(r) => r.appendix}
								style={{
									textTransform: 'uppercase',
									fontSize: 11,
									padding: 4,
								}}
							/>
						</TableBody>
					</Table>
				</View>
				<View style={{ marginLeft: '5%' }}>
					<Text
						style={{
							marginTop: '3%',
							...styles.points,
						}}
					>
						{' '}
						B) {'   '}SOFT COPY DETAILS: {report.soft_copy_details}
					</Text>

					<View>
						<View style={{ flexDirection: 'row', border: 1, width: 502 }}>
							<View>
								<View
									style={{
										border: 1,
										fontSize: 11,
										padding: 4,
										width: 170,
										textAlign: 'center',
										height: 35,
									}}
								>
									<Text>FULL SCENE(GEOTIFF)</Text>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<View
										style={{
											border: 1,
											fontSize: 11,
											padding: 4,
											width: 120,
											textAlign: 'center',
										}}
									>
										<Text>ANNOTATED (Everest)</Text>
									</View>
									<View
										style={{
											border: 1,
											fontSize: 11,
											padding: 4,
											width: 50,
											textAlign: 'center',
										}}
									>
										<Text>0</Text>
									</View>
								</View>
								<View style={{ flexDirection: 'row' }}>
									<View
										style={{
											border: 1,
											fontSize: 11,
											padding: 4,
											width: 120,
											textAlign: 'center',
										}}
									>
										<Text>UNANNOTATED (WGS84)</Text>
									</View>
									<View
										style={{
											border: 1,
											fontSize: 11,
											padding: 4,
											width: 50,
											textAlign: 'center',
										}}
									>
										<Text>0</Text>
									</View>
								</View>
							</View>
							<View>
								<View
									style={{
										border: 1,
										fontSize: 11,
										padding: 4,
										width: 110,
										textAlign: 'center',
										height: 35,
									}}
								>
									<Text>ILLUSTRATIONS(TIFF) </Text>
								</View>
								<View
									style={{
										border: 1,
										fontSize: 11,
										padding: 4,
										width: 110,
										height: 68.5,
										textAlign: 'center',
									}}
								>
									<Text>{subreports.length}</Text>
								</View>
							</View>
							<View>
								<View
									style={{
										border: 1,
										fontSize: 11,
										padding: 4,
										width: 110,
										textAlign: 'center',
										height: 35,
									}}
								>
									<Text>APPENDIX (1 No.)</Text>
								</View>
								<View
									style={{
										border: 1,
										fontSize: 11,
										padding: 4,
										width: 110,
										height: 68.5,
										textAlign: 'center',
									}}
								>
									<Text>A</Text>
								</View>
							</View>
							<View>
								<View
									style={{
										border: 1,
										fontSize: 11,
										padding: 4,
										width: 110,
										textAlign: 'center',
										height: 35,
									}}
								>
									<Text>APPENDIX (1 No.)</Text>
								</View>
								<View
									style={{
										border: 1,
										fontSize: 11,
										padding: 4,
										width: 110,
										height: 68.5,
										textAlign: 'center',
									}}
								>
									<Text>Enclosed</Text>
								</View>
							</View>
						</View>
					</View>
				</View>
				<View>
					<Text
						style={{
							marginTop: '3%',
							...styles.note,
						}}
					>
						Copy of report may also be forwarded to {report.agency}
					</Text>
					<Text
						style={{
							marginTop: '3%',
							...styles.note,
						}}
					>
						6.{' '}
						<Text style={{ ...styles.note }}>
							The intelligence contained in this report has not been
							disseminated to any other agency.{' '}
						</Text>
					</Text>
				</View>
				<View>
					<Text
						style={{
							marginTop: '3%',
							...styles.note,
						}}
					>
						Note: "UO (text) may be destroyed at your end after usage, under
						intimation to this office. However consent may be obtained from this
						office prior destruction of illustrations/album and CD/DVDs".
					</Text>
					<Text
						style={{
							marginTop: '3%',
							...styles.note,
						}}
					>
						Encls. : As above.
					</Text>
				</View>
				<View style={{ fontSize: 11, textAlign: 'right', marginRight: 50 }}>
					<Text style={{ fontSize: 11 }}>{report.rep_name}</Text>
					<Text style={{ fontSize: 11 }}>{report.designation}</Text>
				</View>
				<View style={{ fontSize: 11 }}>
					<Text style={{ fontSize: 11 }}>List of Addresses</Text>
					<Text style={{ fontSize: 11 }}>{report.addresses}</Text>
				</View>

				{/* <View>
					<Text style={styles.watermark} fixed>
						WATERMARK
					</Text>
				</View> */}
			</Page>
			<Page size="A4" style={styles.body} wrap>
				<Text
					style={{
						textTransform: 'uppercase',
						textAlign: 'center',
						textDecoration: 'underline',
						fontSize: 11,
					}}
				>
					{report.confidentiality}
				</Text>

				<Text style={styles.pageCount}>
					Page No :{' '}
					<Text
						style={styles.pageNumber}
						render={({ pageNumber, totalPages }) => `${pageNumber}`}
						fixed
					/>
				</Text>
				<View style={{ width: 400, marginLeft: 50, marginTop: 5 }}>
					{subreports &&
						subreports.map((sr, key) => (
							<View key={key}>
								{sr.htmldata != null ? (
									<ViewTag ele={html2json(sr.htmldata)} />
								) : null}
							</View>
						))}
				</View>
			</Page>
			{subreports.length != 0 ? (
				<Page size="A3" orientation="landscape" style={styles.body} wrap>
					{subreports
						? subreports.map((sr, key) => (
								<Image src={sr.thumbnail_path} style={{ margin: '1.5rem' }} />
						  ))
						: null}
				</Page>
			) : null}
		</Document>
	);
};

Font.register({
	family: 'Arial',
	fonts: [{ src: 'assets/fonts/arial.ttf', fontWeight: 300 }],
});

const styles = StyleSheet.create({
	body: {
		width: '100%',
		paddingTop: 35,
		paddingBottom: 65,
		paddingHorizontal: 35,
	},
	title: {
		fontSize: 24,
		textTransform: 'uppercase',
		textAlign: 'center',
		fontFamily: 'Arial',
	},
	time: {
		fontSize: 11,
		textAlign: 'center',
		marginBottom: 3,
		fontFamily: 'Arial',
	},
	subtitle: {
		fontSize: 18,
		margin: 5,
		fontFamily: 'Arial',
	},
	text: {
		marginTop: 10,
		fontSize: 11,
		textAlign: 'justify',
		fontFamily: 'Arial',
	},
	image: {
		marginVertical: 15,
		marginHorizontal: 100,
	},
	header: {
		fontSize: 11,
		marginBottom: 20,
		textAlign: 'center',
		color: 'grey',
	},
	pageNumber: {
		position: 'absolute',
		fontSize: 11,
		bottom: 30,
		left: 0,
		right: 0,
		textAlign: 'center',
	},
	subhead: {
		color: 'grey',
		fontSize: 11,
		textAlign: 'center',
		fontFamily: 'Arial',
	},
	info: {
		color: 'grey',
		fontSize: 11,
		textAlign: 'center',
		fontFamily: 'Arial',
	},
	pageCount: {
		textTransform: 'uppercase',
		textAlign: 'center',
		fontSize: 11,
		color: '#303030',
	},
	address: {
		textTransform: 'uppercase',
		textAlign: 'center',
		fontSize: 11,
	},
	points: {
		textTransform: 'uppercase',
		fontSize: 11,
	},
	sensorDetails: {
		textTransform: 'uppercase',
		fontSize: 11,
	},
	note: {
		fontSize: 11,
	},
	tableStyle: {
		border: 1,
		fontSize: 11,
		padding: 4,
		width: 110,
		height: 35,
		textAlign: 'center',
	},
	watermark: {
		fontSize: 80,
		color: '#E8E8E8',
		marginTop: -300,
		transform: 'rotate(-45deg)',
	},
});

export default MyDocument;
