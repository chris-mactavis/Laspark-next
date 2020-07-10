import Head from "next/head";
import React from "react";
import Layout from "../../Components/Layout";

const ParkRules = () => {
    return <Layout hasHeader={false}>
        <Head>
            <title>Park Rules</title>
        </Head>


        <section className="park-rules">
            <div className="container">
                <div className="row">
                    <div className="col">
                        <h2 className="text-center mb-5">Park Rules</h2>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-8 mx-auto">
                        <ul>
                            <li>No destruction or abuse of the Green Areas, Properties and Equipment.</li>
                            <li>Chairs and canopies are not allowed on the Lawn.</li>
                            <li>No spitting, littering, polluting, dumping, urinating and defecation.</li>
                            <li>No glass bottle or other glass containers is permitted into the park except those used
                                in the care and feeding of infant children.
                            </li>
                            <li>No explosives, firearms, controlled substances and weapons are allowed into the park.
                            </li>
                            <li>No animals allowed in the park except guide dogs.</li>
                            <li>No form of fire making device or equipment allowed without LASPARK permit.</li>
                            <li>No personal use of generator permitted within the park.</li>
                            <li>No disorderly behaviour.</li>
                            <li>No bicycle, scooter, roller skates, skateboards or the like on lawns.</li>
                            <li>No playing of ball games on the lawns.</li>
                            <li>No unlawful erection of tent, shelter or camp in the park.</li>
                            <li>Professional use of cameras attracts permit fees.</li>
                            <li>No food or drinks allowed inside the children’s playground.</li>
                            <li>Do not leave your property unattended.</li>
                            <li>Children’s Playground is for Age under 14years only.</li>
                            <li>Ensure adequate adult supervision for your child(ren).</li>
                            <li>Adults are not allowed in the playing ground without a child(ren).</li>
                            <li>Group use of park with LASPARK’s permit Only.</li>
                            <li>Opening and closing time is (9am – 6pm daily).</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    </Layout>
}

export default ParkRules;