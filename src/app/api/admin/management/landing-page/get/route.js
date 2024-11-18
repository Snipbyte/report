import connectDb from "../../../../../../../backend/middleware/db";
import LandingPage from "../../../../../../../backend/models/landingPage";

const getLandingPagesHandler = async (request) => {
  try {
    const landingPages = await LandingPage.find();

    return NextResponse.json(
      { message: "Landing pages fetched successfully", landingPages },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error fetching landing pages:", error);
    return NextResponse.json(
      { message: "Failed to fetch landing pages", error: error.message },
      { status: 500 }
    );
  }
};

export const GET = connectDb(getLandingPagesHandler);
