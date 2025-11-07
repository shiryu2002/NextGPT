import { useEffect, useState } from "react";
import Layout from "../../components/layout/Layout";
import GitHubIcon from "@mui/icons-material/GitHub";

interface GitHubIssue {
  id: number;
  title: string;
  html_url: string;
  labels: { name: string }[];
}

export default function Github() {
  const [issues, setIssues] = useState<GitHubIssue[]>([]);

  useEffect(() => {
    const apiIssueUrl =
      "https://api.github.com/repos/Shiryu-Toujima-1f10210346/NextGPT/issues";
    const accessToken = process.env.NEXT_PUBLIC_GITHUB_ACCESS_TOKEN;

    fetch(apiIssueUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        const filteredIssues = data.filter((issue: GitHubIssue) =>
          issue.labels.some((label) => label.name === "checked")
        );
        setIssues(filteredIssues);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  const renderIssuesByLabel = (labelName: string, color: string) => {
    return issues
      .filter((issue) => issue.labels.some((label) => label.name === labelName))
      .map((issue) => (
        <li key={issue.id}>
          <span>･</span>
          <a
            href={issue.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={`${color} underline`}
          >
            {issue.title}
          </a>
        </li>
      ));
  };

  return (
    <Layout title="GitHub">
      <div className="lg:mt-10 text-center">
        <div>
          <GitHubIcon className="inline-block text-6xl" />
          <span className="text-3xl">Githubに飛びます</span>
        </div>
        <ul>
          <li>
            <a
              href="https://github.com/Shiryu-Toujima-1f10210346/NextGPT/issues/new?assignees=&labels=bug&projects=&template=bug-report.md&title="
              target="_blank"
              rel="noopener noreferrer"
              className="text-red-500 underline"
            >
              バグ報告はこちらから
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Shiryu-Toujima-1f10210346/NextGPT/issues/new?assignees=&labels=enhancement&projects=&template=fature-request.md&title="
              target="_blank"
              rel="noopener noreferrer"
              className="text-green-500 underline"
            >
              機能追加のリクエストはこちらから
            </a>
          </li>
          <li>
            <a
              href="https://github.com/Shiryu-Toujima-1f10210346/NextGPT/issues/new?assignees=&labels=enhancement&projects=&template=improve-request.md&title="
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-500 underline"
            >
              改善要望はこちらから
            </a>
          </li>
        </ul>
        <br />
        <h1 className="text-2xl">既知のバグ</h1>
        <ul>{renderIssuesByLabel("bug", "text-red-500")}</ul>
        <br />
        <h1 className="text-2xl">機能要望</h1>
        <ul>{renderIssuesByLabel("enhancement", "text-green-500")}</ul>
        <br />
        <h1 className="text-2xl">改善案</h1>
        <ul>{renderIssuesByLabel("improve", "text-blue-500")}</ul>
      </div>
    </Layout>
  );
}
