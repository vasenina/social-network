import Graph from "react-graph-vis";
import { useEffect, useState } from "react";
//import "./network.css";

export default function Net() {
    const [users, setUsers] = useState([]);
    const [edges, setEdges] = useState([]);
    useEffect(() => {
        console.log("NEt useEffect");

        fetch("/api/get-network")
            .then((res) => res.json())
            .then((data) => {
                console.log("net in data", data);
                if (data.success) {
                    const graphUsers = data.users.map((user) => {
                        const graphUser = {
                            id: user.id,
                            label: `${user.first} ${user.last}`,
                            shape: "circularImage",
                            image: user.image_url,
                        };
                        return graphUser;
                    });
                    setUsers(graphUsers);
                    const graphEdges = data.edges.map((edge) => {
                        const newEdge = {
                            from: edge.sender_id,
                            to: edge.recipient_id,
                        };
                        return newEdge;
                    });
                    setEdges(graphEdges);
                }
            });
    }, []);
    const graph = {
        nodes: users,
        edges: edges,
    };

    const options = {
        autoResize: false,
        layout: {
            // hierarchical: true,
            improvedLayout: true,
        },
        edges: {
            color: "#000000",
        },
        height: "500px",
    };

    const events = {
        select: function (event) {
            var { nodes, edges } = event;
        },
    };
    return (
        <Graph
            graph={graph}
            options={options}
            events={events}
            getNetwork={(network) => {
                //  if you want access to vis.js network api you can set the state in a parent component using this property
            }}
        />
    );
}
