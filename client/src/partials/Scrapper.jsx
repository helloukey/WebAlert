import { useEffect, useState } from "react";
import ErrorAlert from "../utils/ErrorAlert";
import SuccesAlert from "../utils/SuccesAlert";
import { useNavigate } from "react-router-dom";

export default function Scrapper() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [scrapeError, setScrapeError] = useState("");
  const [scrapes, setScrapes] = useState([]);
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  // URL validation regex
  const urlRegex = new RegExp(
    /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/i
  );

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    // Get form data
    const url = e.target.url.value;
    const selector = e.target.selector.value;

    // Check if URL and selector are provided
    if (!url || !selector) {
      setError("URL and CSS selector are required.");
      setLoading(false);
      return;
    }

    // Check if URL is valid
    if (!urlRegex.test(url)) {
      setError("Invalid URL.");
      setLoading(false);
      return;
    }

    // Scrape data
    const request = await fetch(
      import.meta.env.VITE_BACKEND_URL + "/scrape/alert",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Credentials": "true",
        },
        body: JSON.stringify({ url, selector }),
      }
    );

    const response = await request.json();
    if (response.error) {
      setError(response.error);
      setLoading(false);
      return;
    }

    // Reset form
    if (response.success) {
      setLoading(false);
      setSuccess("Data scraped successfully!");
      e.target.reset();
      navigate(0);
    }
  };

  // Get previous scrapes
  useEffect(() => {
    const fetchScrapes = async () => {
      const request = await fetch(
        import.meta.env.VITE_BACKEND_URL + "/scrape/alerts",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
            "Access-Control-Allow-Credentials": "true",
          },
        }
      );

      const response = await request.json();
      if (response.error) {
        setScrapeError(response.error);
        return;
      }

      if (response.success) {
        setScrapes(response.alerts);
      }
    };

    fetchScrapes();
  }, []);

  return (
    <main className="flex-1 px-4 py-8 md:px-6 md:py-10 mb-24">
      <div className="container mx-auto max-w-2xl space-y-8">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">URL Scraper</h1>
          <p className="text-gray-500">
            Enter a URL and CSS selector to scrape data.
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-5">
            <h2 className="text-lg font-medium">Scrape Data</h2>
          </div>
          <div className="border-t border-gray-200 px-6 py-5">
            <form className="grid gap-4" onSubmit={handleSubmit}>
              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="url"
                >
                  URL
                </label>
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  id="url"
                  placeholder="https://example.com"
                  type="text"
                />
              </div>
              <div className="grid gap-2">
                <label
                  className="text-sm font-medium text-gray-700"
                  htmlFor="selector"
                >
                  CSS Selector
                </label>
                <input
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500 focus:ring-gray-500"
                  id="selector"
                  placeholder="div.content"
                  type="text"
                />
              </div>
              {/* Error Alert */}
              {error ? <ErrorAlert error={error} setError={setError} /> : null}
              {/* Success Alert */}
              {success ? (
                <SuccesAlert success={success} setSuccess={setSuccess} />
              ) : null}
              <button
                className="justify-self-end rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-gray-950 focus:ring-offset-2"
                type="submit"
                disabled={loading}
              >
                {loading ? "Scrapping..." : "Scrape"}
              </button>
            </form>
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white shadow-sm">
          <div className="px-6 py-5">
            <h2 className="text-lg font-medium">Previous Scrapes</h2>
            {scrapeError ? (
              <ErrorAlert error={scrapeError} setError={setScrapeError} />
            ) : null}
          </div>
          <div className="border-t border-gray-200 px-6 py-5">
            <div className="overflow-x-auto">
              <table className="w-full table-auto md:table-fixed">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                      URL
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                      Selector
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                      Last Value
                    </th>
                    <th className="px-4 py-3 text-left text-sm font-medium text-gray-900">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {scrapes.map((scrape) => (
                    <tr className="border-b border-gray-200" key={scrape._id}>
                      <td className="px-4 py-3 text-sm text-gray-900 truncate">
                        {scrape.url}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {scrape.selector}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-900">
                        {scrape.lastValue}
                      </td>
                      <td className={`px-4 py-3 text-sm text-gray-900 ${scrape.status === "active" ? "text-green-500" : "text-red-500"}`}>
                        {scrape.status}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
