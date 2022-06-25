import Head from "../components/Header/Header.vue";
import { useState } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { shadesOfPurple } from "../node_modules/react-syntax-highlighter/dist/esm/styles/hljs";

import { useSelector } from "react-redux";

import FixedButton from "../components/FixedButton";
import Table from "../components/Table";
import InlineForm from "../components/InlineForm";
import Properties from "../components/Form/Properties";

export default function Home() {
  const [type, setType] = useState("table");

  const [tabs] = useState(["Table", "Code"]);
  const projects = useSelector((state) => state.projects);

  const changeTable = (e) => {
    if (e.target.textContent.toLowerCase() === "table") {
      setType("table");
    } else if (e.target.textContent.toLowerCase() === "code") {
      setType("code");
    }
  };

  return (
    <div className="mt-5">
      <Head title="JCon" />

      <h3 className="col-6 text-muted">
        Build and export your data with ease in object notation
      </h3>
      <br />
      <br />

      <FixedButton />

      <section className="main-container px-3">
        <div className="d-flex align-items-center justify-content-end p-3">
          <div className="d-flex bg-white px-3 rounded-1 shadow-1">
            {tabs.map((tab, index) => {
              return (
                <div className="card-item mx-3" key={index}>
                  {tab.toLowerCase() === type ? (
                    <button
                      className={"btn text-primary"}
                      type="button"
                      onClick={changeTable}
                    >
                      {tab}
                    </button>
                  ) : (
                    <button
                      className={"btn"}
                      type="button"
                      onClick={changeTable}
                    >
                      {tab}
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        <Table>
          {type === "table" ? (
            <div className="tableBody border-0" id="tableFormat">
              <div className="column" id="fileName-column">
                {/* <div className="empty-column">Create File</div> */}

                <div className="item">
                  <div className="data">
                    <div className="item-name">Crypto Data</div>

                    <div className="item-prop">
                      <button className="btn text-secondary">
                        <i className="bi bi-cloud-arrow-down"></i>
                      </button>

                      <button className="btn text-danger">
                        <i className="bi bi-trash2"></i>
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              <div className="column" id="prop-column">
                {/* <div className="empty-column">No Properties Yet</div> */}
                <div className="top-form-column">
                  <button className="btn text-primary"> + Add Prop</button>
                </div>
                <br />
                {/* ======Properties item */}
                <Properties>
                  <InlineForm />
                </Properties>
              </div>

              <div className="column" id="values_column"></div>
            </div>
          ) : (
            // Code View
            <SyntaxHighlighter
              language="json"
              style={shadesOfPurple}
              className="code-view"
            >
              {JSON.stringify({
                code: true,
                name: "Emmanuel",
                age: 26,
                height: 6.5,
              })}
            </SyntaxHighlighter>
          )}
        </Table>
      </section>
    </div>
  );
}
