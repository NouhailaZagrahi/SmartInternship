import React from 'react';
import '../css/FAQ.css';

const FAQ = () => {
    return (
        <section className="container-fluid py-5 faq-section">
            <div className="container py-5">
                <div className="text-center mx-auto mb-5" style={{ maxWidth: '800px' }}>
                    <h2 className="text-highlight fw-bold">FAQs</h2>
                    <h3 className="display-6 fw-semibold mb-3 text-purple">Questions Fréquemment Posées</h3>
                    <p className="text-muted">
                        Voici les réponses aux questions les plus courantes concernant l'utilisation de notre plateforme de stages.
                    </p>
                </div>
                <div className="row g-4 align-items-start">
                    <div className="col-lg-6">
                        <div className="accordion" id="faqAccordion">
                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingOne">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                        Comment puis-je m'inscrire en tant qu'étudiant ?
                                    </button>
                                </h2>
                                <div id="collapseOne" className="accordion-collapse collapse" aria-labelledby="headingOne"
                                    data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Cliquez sur "S'inscrire", choisissez "Étudiant", puis remplissez les champs : email, mot de passe, école, etc.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingTwo">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                        Comment les entreprises publient-elles des offres ?
                                    </button>
                                </h2>
                                <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo"
                                    data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Une fois connectée, une entreprise peut accéder à son tableau de bord et créer une nouvelle offre avec tous les détails requis.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingThree">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                        L'IA de la plateforme est-elle obligatoire ?
                                    </button>
                                </h2>
                                <div id="collapseThree" className="accordion-collapse collapse" aria-labelledby="headingThree"
                                    data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Non. L'IA est une fonctionnalité facultative pour recommander les offres selon votre profil. Vous pouvez chercher manuellement.
                                    </div>
                                </div>
                            </div>

                            <div className="accordion-item">
                                <h2 className="accordion-header" id="headingFour">
                                    <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse"
                                        data-bs-target="#collapseFour" aria-expanded="false" aria-controls="collapseFour">
                                        Puis-je modifier mon profil après inscription ?
                                    </button>
                                </h2>
                                <div id="collapseFour" className="accordion-collapse collapse" aria-labelledby="headingFour"
                                    data-bs-parent="#faqAccordion">
                                    <div className="accordion-body">
                                        Oui, vous pouvez accéder à votre profil depuis le tableau de bord et modifier vos informations à tout moment.
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>

                    <div className="col-lg-6">
                        <div className="faq-image rounded overflow-hidden">
                            <img src="img/faq.jpg" className="img-fluid w-100" alt="FAQs stages" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
