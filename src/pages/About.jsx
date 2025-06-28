import React from 'react';

const About = () => {
  return (
    <div className="p-6 max-w-4xl mx-auto text-lg leading-relaxed text-gray-800">
      <h1 className="text-3xl font-bold mb-4 text-orange-600">About the Project</h1>
      <p className="text-white">
        <strong>Coding Social</strong> is a community-driven platform built to bridge the gap between coders around the world by enabling them to share and showcase their competitive programming and development profiles in one central space. The core idea of the project is to provide a simple yet effective way for students, developers, and coding enthusiasts to submit and view usernames from popular platforms like GitHub, LeetCode, and Codeforces. Whether you're preparing for interviews, building a personal brand, or scouting for team members, Coding Social allows you to quickly discover the coding presence of other users across these platforms.
      </p>
      <br />
      <p className="text-white">
        Built with React and styled using modern tools like Tailwind CSS and Material UI, the project uses Supabase as a backend-as-a-service for storing and retrieving user submissions. It simplifies the full-stack development process by removing the need for a custom backend while ensuring scalable and real-time data operations. Users can fill out a form with their name, email, and usernames across various coding sites. Once submitted, the data is stored in the cloud and instantly rendered on a dynamic homepage in the form of interactive user cards. Each card contains clickable links to the respective platforms.
      </p>
      <br />
      {/* <p>
        Beyond just technical implementation, the project is designed with clean UI/UX principles to ensure ease of use, responsiveness, and accessibility. Features like form validation, toast notifications, and route-based navigation enhance the user experience. Future enhancements may include search and filtering options, profile ranking systems, and user authentication to allow editing or deleting profiles. Ultimately, Coding Social aims to be more than just a portfolio listing — it envisions itself as a hub for developers to connect, get inspired, and grow together through shared competitive and open-source coding journeys.
      </p> */}
    </div>
  );
};

export default About;
