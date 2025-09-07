"use client";

import React, { useState } from "react";
import {
  GitCommit,
  User,
  // Calendar,
  Hash,
  ExternalLink,
  Copy,
  Check,
} from "lucide-react";
import { Commit } from "../lib/types";

const CommitMessageRenderer = ({ commits }: { commits: Commit[] }) => {
  const [copiedSha, setCopiedSha] = useState<string | null>(null);

  // Sample commit data - replace with your actual GitHub API data

  // const formatDate = (dateString) => {
  //   const date = new Date(dateString);
  //   return date.toLocaleString("en-US", {
  //     year: "numeric",
  //     month: "short",
  //     day: "numeric",
  //     hour: "2-digit",
  //     minute: "2-digit",
  //   });
  // };

  const getCommitType = (message: string) => {
    const types = {
      feat: {
        label: "Feature",
        color: "bg-green-100 text-green-800 border-green-200",
      },
      fix: { label: "Fix", color: "bg-red-100 text-red-800 border-red-200" },
      docs: {
        label: "Docs",
        color: "bg-blue-100 text-blue-800 border-blue-200",
      },
      style: {
        label: "Style",
        color: "bg-purple-100 text-purple-800 border-purple-200",
      },
      refactor: {
        label: "Refactor",
        color: "bg-yellow-100 text-yellow-800 border-yellow-200",
      },
      test: {
        label: "Test",
        color: "bg-indigo-100 text-indigo-800 border-indigo-200",
      },
      chore: {
        label: "Chore",
        color: "bg-gray-100 text-gray-800 border-gray-200",
      },
    };

    for (const [type, config] of Object.entries(types)) {
      if (message.toLowerCase().startsWith(`${type}:`)) {
        return config;
      }
    }

    return {
      label: "Commit",
      color: "bg-gray-100 text-gray-800 border-gray-200",
    };
  };

  const parseCommitMessage = (message: string) => {
    const lines = message.split("\n");
    const title = lines[0];
    const body = lines.slice(2).join("\n").trim(); // Skip empty line after title

    return { title, body };
  };

  const copyToClipboard = async (text: string, sha: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedSha(sha);
      setTimeout(() => setCopiedSha(null), 2000);
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  const shortenSha = (sha: string) => sha.substring(0, 7);

  return (
    <section>
      <hgroup className="mb-8">
        <h2 className="mb-2 flex items-center gap-2">
          <GitCommit className="w-8 h-8" />
          Commit Messages
        </h2>
        <p>Recent commits from the repository</p>
      </hgroup>

      <div className="space-y-6">
        {commits.map((commit, idx) => {
          const { title, body } = parseCommitMessage(commit.message);
          const commitType = getCommitType(title);

          return (
            <div
              key={idx}
              className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
            >
              {/* Header */}
              <div className="p-6 border-b border-gray-100">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium border ${commitType.color}`}
                      >
                        {commitType.label}
                      </span>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <Hash className="w-4 h-4" />
                        <code className="bg-gray-100 px-2 py-1 rounded text-xs font-mono">
                          {shortenSha(commit.sha)}
                        </code>
                        <button
                          onClick={() =>
                            copyToClipboard(commit.sha, commit.sha)
                          }
                          className="p-1 hover:bg-gray-200 rounded transition-colors"
                          title="Copy full SHA"
                        >
                          {copiedSha === commit.sha ? (
                            <Check className="w-3 h-3 text-green-600" />
                          ) : (
                            <Copy className="w-3 h-3" />
                          )}
                        </button>
                      </div>
                    </div>

                    <h3 className="text-lg font-semibold text-gray-900 mb-3 leading-tight">
                      {title}
                    </h3>

                    {body && (
                      <div className="prose prose-sm max-w-none">
                        <pre className="whitespace-pre-wrap text-gray-700 bg-gray-50 p-3 rounded text-sm leading-relaxed border">
                          {body}
                        </pre>
                      </div>
                    )}
                  </div>

                  <a
                    href={commit.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-1 text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline"
                  >
                    <ExternalLink className="w-4 h-4" />
                    View
                  </a>
                </div>
              </div>

              {/* Footer */}
              <div className="px-6 py-4 bg-gray-50 flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4" />
                    <span className="font-medium">{commit.author.name}</span>
                    <span className="text-gray-400">
                      ({commit.author.email})
                    </span>
                  </div>
                </div>

                {/* <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  <time dateTime={commit.author.date}>
                    {formatDate(commit.author.date)}
                  </time>
                </div> */}
              </div>
            </div>
          );
        })}
      </div>

      {commits.length === 0 && (
        <div className="text-center py-12">
          <GitCommit className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600">No commits to display</p>
        </div>
      )}
    </section>
  );
};

export default CommitMessageRenderer;
