import "./poll.scss";
import Button from "../Button/Button";
import { IoIosClose } from "react-icons/io";
import { getCookieString } from "../../utils/authentication/Authentication";
import { useState, useEffect } from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import PollElement from "../PollElement/PollElement";
import Authentication from "../../utils/authentication/Authentication";
import LoaderText from "../../layout/Loader/LoaderText";

type PollProps = {
    closeBigCard: () => void;
};

interface IQuestions {
    id: number;
    answers: [];
    content: string;
}

const Poll: React.FC<PollProps> = ({ closeBigCard }) => {
    const [displayPoll, setDispayPoll] = useState<IQuestions[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const token = getCookieString("token");

    const allQuestionsFetch = async () => {
        setIsLoading(true);
        try {
            const response = await fetch(
                `${import.meta.env.VITE_API_BASE_URL}/polls`,
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.ok) {
                const result = await response.json();
                console.log(result);
                setDispayPoll(result);
                setIsLoading(false);
            }
        } catch (error) {
            console.error(error);
            setIsLoading(false);
        }
    };
    useEffect(() => {
        allQuestionsFetch();
    }, []);

    return (
        <Authentication>
            <article id="poll">
                <Button
                    type={"button"}
                    className={"close"}
                    onClick={closeBigCard}
                >
                    <span>
                        <IoIosClose />
                    </span>
                </Button>

                {isLoading ? (
                    <p
                        style={{
                            height: 36,
                            textAlign: "left",
                            margin: "0 40px 20px 20px",
                            paddingTop: 10,
                        }}
                    >
                        <LoaderText />
                    </p>
                ) : (
                    <Carousel
                        showThumbs={false}
                        showIndicators={false}
                        showStatus={false}
                        useKeyboardArrows={true}
                    >
                        {displayPoll.map((poll) => (
                            <div key={poll.id}>
                                <h2>{poll.content}</h2>
                                <PollElement pollNumber={poll.id} />
                            </div>
                        ))}
                    </Carousel>
                )}
            </article>
        </Authentication>
    );
};
export default Poll;
