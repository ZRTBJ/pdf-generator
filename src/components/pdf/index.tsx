import { useEffect, useState } from "react";
import ChartComponent from "../chart";
import { Bookmark, Crime } from "../../icons";
import "./index.css";
const initialData = [
  { time: "2018-12-22", value: 32.51 },
  { time: "2018-12-23", value: 31.11 },
  { time: "2018-12-24", value: 27.02 },
  { time: "2018-12-25", value: 27.32 },
  { time: "2018-12-26", value: 25.17 },
  { time: "2018-12-27", value: 28.89 },
  { time: "2018-12-28", value: 25.46 },
  { time: "2018-12-29", value: 23.92 },
  { time: "2018-12-30", value: 22.68 },
  { time: "2018-12-31", value: 22.67 },
];

interface GraphData {
  time: string;
  value: number;
}

const PDFContent = () => {
  const [graphData, setGraphData] = useState<GraphData[]>([]);
  const [ready, setReady] = useState(false);
  const fetchData = async () => {
    const res = await fetch(
      "https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv"
    );
    const res_data = await res.json();
    return res_data;
  };
  useEffect(() => {
    fetchData().then(({ data }) => {
      const res_data: GraphData[] = data.map((_data: any) => {
        return {
          time: `${_data.data_year}-01-01`,
          value: _data.Burglary,
        };
      });
      setGraphData(res_data);
      setReady(true);
    });
  }, []);
  return (
    <div className="container">
      <div className="header">
        <div className="header_content">
          <p className="left_header">
            <Bookmark />
            RealAssist.AI
          </p>
          <p className="right_header">123 Main Street, Dover, NH 03820-4667</p>
        </div>
        <div className="divider" />
      </div>
      <div className="graph_divider">
        <p className="left_header">
          <Crime /> Crime
        </p>
        <div className="divider" />
      </div>
      <div>
        <div className="graph_header">Burglary</div>
        {ready && (
          <div className="graph_container">
            <div className="graph_name">Arrests</div>
            <div className="graph_content">
              <ChartComponent data={graphData} />
            </div>
          </div>
        )}
      </div>
      <div className="footer">
        <div className="divider" />
        <div className="header_content">
          <p className="left_footer">Report Generated on September 26, 2023</p>
          <p className="right_footer">
            RealAssist Property Report | Page 1{" "}
            <span style={{ color: "#626E99" }}>of 25</span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default PDFContent;
